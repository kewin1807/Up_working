import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function homeAction(state = initialState.home, action) {
    switch (action.type) {
        case types.BEGIN_GET_NEWS:
            return {
                ...state,
                ...{
                    isLoading : action.isLoading,
                }
            };
        case types.GET_NEWS_SUCCESS:
            return {
                ...state,
                ...{
                    news : action.news,
                    isLoading: action.isLoading,
                }
            };
        case types.GET_NEWS_ERROR:
            return {
                ...state,
                ...{
                    isLoading : action.isLoading,
                    error : action.error
                }
            }
        case types.BEGIN_GET_DETAIL_NEW :
            return {
                ...state,
                ...{
                    isLoadingDetail : action.isLoadingDetail
                }
            };
        case types.GET_DETAIL_NEW_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingDetail: action.isLoadingDetail,
                    detailNew : action.detailNew,
                }
            };
        case types.GET_DETAIL_NEW_ERROR:
            return {
                ...state,
                ...{isLoadingDetail : action.isLoadingDetail, errorDetail : action.errorDetail}
            };
        case types.BEGIN_SEARCH_NEW:
            return {
                ...state,
                ...{isLoadingSearch : action.isLoadingSearch}
            };
        case types.GET_SEARCH_NEW_SUCCESS:
            return {
                ...state,
                ...{isLoadingSearch: action.isLoadingSearch, news : action.news}
            };
        case types.GET_SEARCH_NEW_ERROR:
            return {
                ...state,
                ...{isLoadingSearch : action.isLoadingSearch, errorSearch : action.errorSearch}
            };
        case types.BEGIN_GET_MORE_NEWS:
            return {
                ...state,
                ...{isLoadingMore: true}
            };
        case types.GET_MORE_NEWS_SUCCESS:
            return {
                ...state,
                ...{isLoadingMore: false, news: [...state.news, ...action.news]}
            };
        case types.GET_MORE_NEWS_ERROR:
            return {
                ...state,
                ...{isLoadingMore : false, errorLoadMore: true}
            };
        case types.BEGIN_REFRESH_NEWS:
            return {
                ...state,
                ...{isRefreshing : true}
            };
        case types.GET_REFRESH_SUCCESS:
            // let array1 = state.news;
            // let array2 = action.news;
            // let array3 = [];
            // let bool = [];
            // for (let i = 0; i< action.news.length; i++){
            //     bool.push(false);
            // }
            //
            // for (let i = 0; i<6; i++){
            //     for (let j = 0;j<6; j++){
            //         if(array2[i].id === array1[j].id){
            //             bool[i] = true;
            //             break;
            //         }
            //     }
            // }
            // for (let i =0; i<6; i++){
            //     if(bool[i]===false){array3.push(array2[i])}
            // }
            // console.log(array3);
            return {
                ...state,
                ...{isRefreshing: false, news : [ ...action.news] }
            };
        case types.GET_REFRESH_ERROR:
            return {
                ...state,
                ...{isRefreshing : false, errorRefresh : true}
            };
        case types.BEGIN_MORE_NEWS_SEARCH:
            return {
                ...state,
                ...{isLoadingMoreSearch: true}
            };
        case types.GET_MORE_NEWS_SEARCH_SUCCESS:
            console.log(action.news);
            return {
                ...state,
                ...{isLoadingMoreSearch: false, news : [...state.news, ...action.news]}
            };
        case types.GET_MORE_NEWS_SEARCH_ERROR:
            return {
                ...state,
                ...{isLoadingMoreSearch : false, errorLoadMoreSearch: true}
            }
        default:
            return state
    }
}