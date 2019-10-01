/*****************************************************************
 *
 * Copyright 2019 IBM Corporation
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
import PropTypes from 'prop-types'
import { Loading } from 'carbon-components-react'
import StructuredListModule from './common/StructuredListModule'
import {updateSecondaryHeader, getOverflowMenu, getStatus} from '../../actions/common'
import SecondaryHeader from './common/SecondaryHeader.jsx'
import msgs from '../../../nls/kappnav.properties'
import { CONTEXT_PATH } from '../../actions/constants'


class DetailView extends Component {
  constructor (props){
    super(props)

    this.state = {
      data: {},
      loading: true,
      name : decodeURIComponent(location.pathname.split('/').filter((e) => { return e })[4])
    }

    this.fetchData = this.fetchData.bind(this)
  }

  render() {
    var paths = location.pathname.split('/')
    paths = paths.filter((e) => { return e })
    const title = msgs.get('page.applicationView.title')
    const name = decodeURIComponent(paths[2])
    // eslint-disable-next-line no-undef
    const parent_ns = decodeURIComponent(url.searchParams.get('parentnamespace'))
    const itemName = decodeURIComponent(paths[4])
    // eslint-disable-next-line no-undef
    const ns = decodeURIComponent(url.searchParams.get('namespace'))

    const breadcrumbItems=[{label:title, url:CONTEXT_PATH+'/' + paths[1]},
      {label:name, url:CONTEXT_PATH+'/'+paths[1]+'/'+encodeURIComponent(name)+'?namespace='+encodeURIComponent(parent_ns)},
      // eslint-disable-next-line no-undef
      {label:itemName, url:CONTEXT_PATH+'/'+paths[1]+'/'+encodeURIComponent(name)+'/'+resourceType+'/'+encodeURIComponent(itemName)+'?namespace='+encodeURIComponent(ns)+'&parentnamespace='+encodeURIComponent(parent_ns)} ]

    if (this.state.loading)
      return <Loading withOverlay={false} className='content-spinner' />
    else return (
      <div>
        <SecondaryHeader title={this.state.name} breadcrumbItems={breadcrumbItems} location={location} />
        <div className="page-content-container" role="main">
          <StructuredListModule
            title={this.props.staticResourceData.detailKeys.title}
            headerRows={this.props.staticResourceData.detailKeys.headerRows}
            rows={this.props.staticResourceData.detailKeys.rows}
            id={this.state.name+'-overview-module'}
            data={this.state.data} />
        </div>
      </div>
    )
  }

  componentDidMount(){
    this.fetchData(this.state.name, this.props.baseInfo.selectedNamespace)
    if(window.secondaryHeader !== undefined){
      if (!window.secondaryHeader.refreshCallback) {
        window.secondaryHeader.refreshCallback = function(result) {
          if(result && result.operation == 'delete' && result.name == this.state.name){
            const breadcrumbs = window.secondaryHeader.props.breadcrumbItems
            let url= '/'+this.props.staticResourceData.resourceType+'s'
            if(breadcrumbs) {
              url = breadcrumbs[breadcrumbs.length-2].url
            }
            window.location.href = location.protocol+'//'+location.host+url
          } else {
          //Update Table
            this.fetchData(this.state.name, this.props.baseInfo.selectedNamespace)
          }
        }.bind(this)
      }
    }

    var self = this
    window.setInterval(() => {
      self.refreshDetail(self.state.name, self.props.baseInfo.selectedNamespace)
    }, 30000)
  }


  fetchData(name, namespace) {
    this.setState({loading: true})
    this.refreshDetail(name, namespace)
  }

  refreshDetail(name, namespace) {
    fetch(this.props.staticResourceData.link(name, namespace))
      .then(response => {
        if (!response.ok) {
          //TODO: error here
          this.setState({ loading: false })
          return null
        } else {
          return response.json()
        }
      }).then(result => {
        if (result) {
          this.setState({ loading: false, data: result })

          //fetch the action maps
          fetch(('/kappnav/resource/' + encodeURIComponent(result.metadata.name) + '/' + result.kind + '/actions?namespace=' + encodeURIComponent(result.metadata.namespace)))
            .then(response => {
              if (!response.ok) {
                //no error here because it just means that the action maps will not be populated
                // try to populate at least the built in urlActions
                var metadata = result.metadata
                updateSecondaryHeader(getStatus(metadata, this.props.baseInfo.appNavConfigMap).statusColor, getStatus(metadata, this.props.baseInfo.appNavConfigMap).statusText, getOverflowMenu(result, undefined, this.props.staticResourceData, undefined, undefined))
                return null
              } else {
                return response.json()
              }
            }).then(actions => {
              if (actions) {
                //fetch the action maps
                var metadata = result.metadata
                var applicationName

                //Set application name if we are navigating from applications
                var paths = window.location.pathname.split('/')
                if (paths[2] === 'applications') {
                  applicationName = paths[3]
                } else {
                  applicationName = 'kappnav.not.assigned'
                }

                var applicationNamespace = metadata.namespace
                updateSecondaryHeader(getStatus(metadata, this.props.baseInfo.appNavConfigMap).statusColor, getStatus(metadata, this.props.baseInfo.appNavConfigMap).statusText, getOverflowMenu(result, actions, this.props.staticResourceData, applicationName, applicationNamespace))
              }
            })
        }
      })
  }

} // end of DetailView component

DetailView.propTypes = {
  baseInfo: PropTypes.object,
  staticResourceData: PropTypes.object.isRequired
}

export default connect(
  (state) => ({
    baseInfo: state.baseInfo,
  }),
  {
  }
)(DetailView)
