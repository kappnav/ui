/*****************************************************************
 *
 * Copyright 2020 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *****************************************************************/

import 'carbon-components/scss/globals/scss/styles.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Loading, Button, DataTable} from 'carbon-components-react'
import {CONTEXT_PATH, PAGE_SIZES, SORT_DIRECTION_ASCENDING, RESOURCE_TYPES, STATUS_COLORS, CONFIG_CONSTANTS} from '../../actions/constants'
import {getRowSlice, sort, sortColumn, getOverflowMenu, buildStatusHtml, getAge, getAgeDifference, getCreationTime, performUrlAction} from '../../actions/common'
import msgs from '../../../nls/kappnav.properties'
import SecondaryHeader from './common/SecondaryHeader.jsx'
import ResourceTable from './common/ResourceTable.js'
import getResourceData from '../../definitions/index'
import {getSearchableCellList, SEARCH_HEADER_TYPES} from './common/ResourceTable.js'
import { getToken, openActionModal } from '../../actions/common'

const jobResourceData = getResourceData(RESOURCE_TYPES.JOB)

const {
  TableCell,
  TableRow
} = DataTable;

// This is the view that shows a collection of Command Actions jobs
class JobView extends Component {

  intervalID = 0

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      totalRows: [],
      filteredRows: [],
      rows: [],
      sortColumn: 'status', // default sort
      sortDirection: SORT_DIRECTION_ASCENDING,
      pageSize: PAGE_SIZES.DEFAULT,
      pageNumber: 1,
      search: undefined,
      headers: [ // Columns in the grid
        {key: 'status', header: msgs.get('table.header.status'), type: SEARCH_HEADER_TYPES.STATUS},
        {key: 'actionName', header: msgs.get('table.header.actionName'), type: SEARCH_HEADER_TYPES.STRING},
        {key: 'appName', header: msgs.get('table.header.applicationName'), type: SEARCH_HEADER_TYPES.URL},
        {key: 'component', header: msgs.get('table.header.component'), type: SEARCH_HEADER_TYPES.STRING},
        {key: 'age', header: msgs.get('table.header.age'), type: SEARCH_HEADER_TYPES.STRING},
        {key: 'menuAction', header: msgs.get('table.header.action'), type: SEARCH_HEADER_TYPES.NOT_SEARCHABLE}
      ],
      viewType: 'table.empty.command.actions',
    }

    // make 'this' visible to class methods
    this.fetchData = this.fetchData.bind(this)
    this.jobIsActive = this.jobIsActive.bind(this)
    this.jobIsPending = this.jobIsPending.bind(this)
    this.jobSucceeded = this.jobSucceeded.bind(this)
    this.jobFailed = this.jobFailed.bind(this)
  }

  render() {
    let viewTitle = msgs.get('page.jobsView.title')
    if (this.state.loading)
      return <Loading withOverlay={false} className='content-spinner'/>
    else
      return (
        <div>
          <SecondaryHeader title={viewTitle} location={location}/>

          <div className="page-content-container" role="main" aria-label={viewTitle}>
            <ResourceTable
              rows={this.state.rows}
              headers={this.state.headers} title={''}
              onInputChange={(e) => {
                this.searchInputChange(e)
              }}
              totalNumberOfRows={this.state.filteredRows.length}
              changeTablePage={(e) => {
                this.handlePaginationClick(e)
              }}
              sortColumn={this.state.sortColumn}
              sortDirection={this.state.sortDirection}
              handleSort={(e) => {
                this.handleSort(e)
              }}
              pageNumber={this.state.pageNumber}
              createNewModal={() => {
                return (
                  <div>
                    <Button small iconDescription={msgs.get('run.inventory')} id={`page-action`} onClick={() => openActionModal(document.documentElement.getAttribute('appnavConfigmapNamespace'), 'kappnav', 'app.k8s.io%2Fv1beta1', 'app-nav-inventory', msgs.get('run.inventory.action.description'))}>
                      {msgs.get('run.inventory')}
                    </Button>
                  </div>
                )
              }}
              viewType={this.state.viewType}
              getCustomTableMsg={this.createMessageForEmptyTable}
            />
          </div>
        </div>
      )
  }

  componentDidMount() {
    this.fetchData(this.state.search)

    let self = this
    this.intervalID = window.setInterval(() => {
      self.refreshData(self.state.search)
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  handlePaginationClick(e) {
    this.filterTable(this.state.search, e.page, e.pageSize, this.state.totalRows)
  }

  searchInputChange(e) {
    this.filterTable(e.target.value, 1, this.state.pageSize, this.state.totalRows)
  }

  filterTable(searchValue, pageNumber, pageSize, totalRows){
    let filteredRows = []
    if (searchValue) {
      const searchValueLowerCase = searchValue.toLowerCase()
      //filter the rows
      totalRows.forEach((row) => {
        let searchFields = getSearchableCellList(row, this.state.headers);
        searchFields = searchFields.map(function(value) {
          // Lowercase everything to make string maching accurate
          return ('' + value).toLowerCase();
        })

        if(searchFields.some(field => field.includes(searchValueLowerCase))) {
          // If one of the fields contains the search string, add the row 
          // to what will be showed in filtered view
          filteredRows.push(row)
          return
        }
      })
    } else {
      //needed in case we are not searching
      filteredRows = totalRows
    }

    //sort the newList
    const sortedList = sort(filteredRows, this.state.sortDirection, this.state.sortColumn)

    this.setState({
      loading: false,
      totalRows: totalRows,
      rows: getRowSlice(sortedList, pageNumber, pageSize),
      pageNumber: pageNumber,
      pageSize: pageSize,
      filteredRows: filteredRows,
      search: searchValue
    })
  }

  handleSort(e) {
    const target = e.currentTarget
    if (target) {
      const newSortColumn = target && target.getAttribute('data-key')
      // eslint-disable-next-line react/no-access-state-in-setstate
      const result = sortColumn(this.state.filteredRows, this.state.sortColumn, this.state.sortDirection, newSortColumn)
      // eslint-disable-next-line react/no-access-state-in-setstate
      const rowSlice = getRowSlice(result.sortedList, this.state.pageNumber, this.state.pageSize)
      this.setState({
        rows: rowSlice,
        sortColumn: newSortColumn,
        sortDirection: result.direction
      })
    }
  }

  fetchData(search) {
    this.setState({loading: true})
    this.refreshData(search)
  }

  getJobStatus(job) {
    const { appNavConfigMap } = this.props
    const statusColorMapping = appNavConfigMap && appNavConfigMap.statuColorMapping
    const statusPrecedence = appNavConfigMap && appNavConfigMap.statusPrecedence ? appNavConfigMap.statusPrecedence : []

    let statusColor = STATUS_COLORS.DEFAULT_COLOR // default grey
    let sortTitle = ''

    let jobName = job && job.metadata.labels['kappnav-job-application-name']

    let doneState = '' // Case sensitive!
    let statusText = ''
    if(this.jobIsActive(job)) {
      doneState = 'In Progress'
      statusText = msgs.get('in.progress')

    } else if(this.jobIsPending(job)) {
      doneState = 'Pending'
      statusText = msgs.get('pending')

    } else if(this.jobFailed(job)) {
      doneState = 'Failed'
      statusText = msgs.get('failed')

    } else if(this.jobSucceeded(job)) {
      doneState = 'Completed'
      statusText = msgs.get('completed')

    } else {
      doneState = 'Unknown'
      statusText = msgs.get('unknown')
    }

    const sortIndex = statusPrecedence.findIndex(val => val === doneState)

    if(statusColorMapping && doneState) {
      const colorKey = statusColorMapping.values && statusColorMapping.values[doneState]
      if(colorKey) {
        const color = statusColorMapping.colors && statusColorMapping.colors[colorKey]
        if(color) {
          statusColor = color
        }
      }

      // Within the same statuses (e.g. Failed), we want the most recent 
      // Failed to be at the top of the Failed grouping
      const createdTime = getCreationTime(job)
      const howOldInMilliseconds = getAgeDifference(createdTime).diffDuration

      sortTitle = sortIndex + '-' + howOldInMilliseconds + '-' + jobName
    }

    return {
      statusMessage: statusText,
      statusColor: statusColor,
      borderColor: STATUS_COLORS.BORDER_COLOR,
      statusText: statusText,
      sortTitle: sortTitle
    }
  }

  jobIsActive(job) {
    if(!job && !!!job.status.active) {
      return false
    }
    return job.status.active > 0
  }

  jobIsPending(job) {
    // If none of these fields exist, the assumption is that
    // the job is pending
    return !job && !!!job.status.active
                && !!!job.status.succeeded
                && !!!job.status.failed
  }

  jobSucceeded(job) {
    if(!job && !!!job.status.succeeded) {
      return false
    }
    return job.status.succeeded > 0
  }

  jobFailed(job) {
    if(!job && !!!job.status.failed) {
      return false
    }
    return job.status.failed > 0
  }

  refreshData(search) {
    fetch('/kappnav/resource/commands').then(result => result.json()).then(result => {
      const rowArray = []
      const actionMap = result[CONFIG_CONSTANTS.ACTION_MAP]
      result.commands.forEach((job) => {

        const metadata = job.metadata
        const metadataLabel = metadata.labels
        const appUuid = metadata.name
        const jobName = metadataLabel['kappnav-job-action-name']

        let itemObj = {}
        itemObj.id = metadata.uid+'-job'
        itemObj.status = buildStatusHtml(this.getJobStatus(job))

        const urlActions = actionMap ? actionMap[CONFIG_CONSTANTS.URL_ACTIONS] : ''
        if(urlActions && urlActions[0]) {
          const detailAction = urlActions[0]
          const kind = 'Job'
          const linkId = kind+'_'+metadata.name+'link'
          
          // apiVersion was not avaliable in the job information, but the rule for needing apiVersion is
          // when the API call uses a Kubernetes kind in the path.  In this case, Job is the kind being
          // called in performUrlAction().
          const apiVersion = job['apiVersion']

          itemObj.actionName =
            <a rel="noreferrer"
              id={linkId} href='#'
              onClick={performUrlAction.bind(this, detailAction['url-pattern'], detailAction['open-window'], kind, appUuid, metadata.namespace, undefined, true, apiVersion)}>
                {jobName}
            </a>
          performUrlAction(detailAction['url-pattern'], detailAction['open-window'], kind, appUuid, metadata.namespace, linkId, false, apiVersion)  //update the link in place
        } else {
          // Not every K8 platform has a URL for displaying K8 Job kind details
          itemObj.actionName = jobName
        }
        
        const applicationName = metadataLabel['kappnav-job-application-name']
        if ( applicationName && applicationName == 'kappnav') { // hidden application name
          itemObj.appName = '-'; 
        }
        else {
          if (applicationName && applicationName === 'kappnav.not.assigned') {
            itemObj.appName = msgs.get('not.assigned')
          } else {
            //since component and application namespace can be different, hence we will be using the application namespace
            itemObj.appName = <a href = {CONTEXT_PATH + '/applications/' + encodeURIComponent(applicationName) + '?namespace=' + metadataLabel['kappnav-job-application-namespace']}>
              {metadataLabel['kappnav-job-application-namespace'] + '/' + applicationName}
            </a>
          }
        }

        const createdTime = getCreationTime(job)
        const howOldInMilliseconds = getAgeDifference(createdTime).diffDuration + ''
        itemObj.age = <div data-sorttitle={howOldInMilliseconds}>{getAge(job)}</div>
        if ( metadataLabel['kappnav-job-application-scope'] == 'true' ) { 
          itemObj.component= '-'
        }
        else { 
          itemObj.component = metadataLabel['kappnav-job-component-namespace'] + '/' + metadataLabel['kappnav-job-component-name']
        } 
        itemObj.menuAction = getOverflowMenu(job, actionMap, jobResourceData)
        rowArray.push(itemObj)
      })
      this.filterTable(search, this.state.pageNumber, this.state.pageSize, rowArray)
    })
  }

  createMessageForEmptyTable(headers) {
    var originalMsg = msgs.get('table.empty.command.actions')
    var auditLinkTxt = msgs.get('inventory.link.text')
    var removeAuditText = originalMsg.split(auditLinkTxt)
    var part1 = removeAuditText[0] //text before 'audit'
    var part2 = removeAuditText[1] //text after 'audit'
    return <TableRow><TableCell colSpan={headers.length + 1} aria-label={originalMsg}>{part1}<a className='emptyTableResourceLink' id='navModalLink' tabIndex='0' aria-label={msgs.get('run.inventory')}>{auditLinkTxt}</a>{part2}</TableCell></TableRow>
  }
} // end of JobView component

const mapStateToProps = (state) => {
  return {
    appNavConfigMap: state.baseInfo.appNavConfigMap
  }
}

export default connect(mapStateToProps)(JobView)
