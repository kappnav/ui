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
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'carbon-components-react'
import StructuredListModule from './common/StructuredListModule'
import {updateSecondaryHeader, getOverflowMenu, getStatus} from '../../actions/common'


class DetailView extends React.Component {
  constructor (props){
    super(props)

    this.state = {
      data: {},
      loading: true
    }

    this.fetchData = this.fetchData.bind(this)
  }

  render() {
    if (this.state.loading)
      return <Loading withOverlay={false} className='content-spinner' />
    else return (
      <StructuredListModule
        title={this.props.staticResourceData.detailKeys.title}
        headerRows={this.props.staticResourceData.detailKeys.headerRows}
        rows={this.props.staticResourceData.detailKeys.rows}
        id={this.props.name+'-overview-module'}
        data={this.state.data} />
    )
  }

  componentDidMount(){
    this.fetchData(this.props.name, this.props.namespace)

    if (!window.secondaryHeader.refreshCallback) {
      window.secondaryHeader.refreshCallback = function(result) {
        if(result && result.operation == 'delete' && result.name == this.props.name){
          const breadcrumbs = window.secondaryHeader.props.breadcrumbItems
          let url= '/'+this.props.staticResourceData.resourceType+'s'
          if(breadcrumbs) {
            url = breadcrumbs[breadcrumbs.length-2].url
          }
          window.location.href = location.protocol+'//'+location.host+url
        } else {
          //Update Table
          this.fetchData(this.props.name, this.props.namespace)
        }
      }.bind(this)
    }

    var self = this
    window.setInterval(() => {
      self.refreshDetail(self.props.name, self.props.namespace)
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
                updateSecondaryHeader(getStatus(metadata, this.props.appNavConfigData).statusColor, getStatus(metadata, this.props.appNavConfigData).statusText, getOverflowMenu(result, undefined, this.props.staticResourceData, undefined, undefined))
                return null
              } else {
                return response.json();
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
                updateSecondaryHeader(getStatus(metadata, this.props.appNavConfigData).statusColor, getStatus(metadata, this.props.appNavConfigData).statusText, getOverflowMenu(result, actions, this.props.staticResourceData, applicationName, applicationNamespace))
              }
            })
        }
      })
  }

} // end of DetailView component

DetailView.propTypes = {
  appNavConfigData: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
  staticResourceData: PropTypes.object.isRequired
}

export default DetailView
