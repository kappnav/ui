/*****************************************************************
 *
 * Copyright 2019, 2020 IBM Corporation
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

// Intital State of Redux store
const initState = {
    resourceTableError:''
}

// Action Types
const LOADING_RESOURCETYPEERROR = 'LOADING_RESOURCETYPEERROR';

// Action Creators
export const loadingResoureTableError = (message) => ({
    type: LOADING_RESOURCETYPEERROR,
    payload: message
});

// Action Dispatchers
export const updateResourceTableError = (error) => {
    return (dispatch) => {
        if (error === undefined) {
            dispatch(loadingResoureTableError(''));
        } else {
            dispatch(loadingResoureTableError(error));
        }
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_RESOURCETYPEERROR:
            return {
                ...state,
                resourceTableError: action.payload
        };
        default:
            return state;
    }
}
