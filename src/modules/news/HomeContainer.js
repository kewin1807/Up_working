import React, {Component} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {Container, Content, Item, Left, Right, Spinner} from 'native-base';
import HamburgerButton from '../../commons/HamburgerButton';
import Loading from '../../commons/Loading';
import * as homeAction from '../news/homeAction';
import {bindActionCreators} from 'redux';
import general from '../../styles/generalStyle';
import {connect} from 'react-redux'
import SearchBar from 'react-native-searchbar';
import SearchButton from '../../commons/SearchButton'
import ListView from '../news/ListView';

class HomeContainer extends Component {
    constructor() {
        super();
        this.state = {
            tab: 0,
            isLoading: false,
            id: 0,
            showSearch: false,
            page: 2,
            txt : ""
        }
    }

    componentWillMount() {
        this.props.homeAction.getNews();
        this.isLoading();
    }

    toggleSearch() {
        if (this.state.showSearch == false) {
            this.setState({showSearch: true});
            this.searchBar.show();
        } else {
            this.setState({showSearch: false});
            this.searchBar.hide();
        }
    }

    onBack() {
        if (this.state.showSearch == false) {
            this.setState({showSearch: true});
            this.searchBar.show();
        } else {
            this.setState({showSearch: false});
            this.searchBar.hide();
        }
    }

    loadMore() {
        if (this.props.isLoadingMore || this.props.isLoadingMoreSearch)
            return (<Loading/>)
        else
            return (<View/>)
    }


    isLoading() {
        this.setState({isLoading: true});
        setTimeout(() => this.setState({isLoading: false}), 1500);
    }

    handleChangText(input) {
        this.isLoading();
        this.setState({txt : input})
        this.props.homeAction.getSearchNew(input);
    }

    getMoreNews() {
        const {news, homeAction} = this.props;
        if (news.length >= 6) {
            this.setState({page: this.state.page + 1});
            if(this.state.txt !== ""){
                homeAction.getMoreNewsSearch(this.state.page, this.state.txt);
            }
            homeAction.getMoreNews(this.state.page);
        }
    }


    render() {
        const {navigate} = this.props.navigation;
        const {colors} = this.props;
        return (
            <Container style={general.wrapperContainer}>
                <View
                    style={general.linearGradient}>
                    <View style={[general.wrapperHeader, general.paddingBorder]}>
                        <Text style={[general.textTitleHeader]}>
                            TIN MỚI
                        </Text>
                        <Right>
                            <HamburgerButton navigate={navigate}/>
                        </Right>
                    </View>
                    <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        onBack={() => this.onBack()}
                        handleChangeText={(input) => this.handleChangText(input)}
                    />
                    <View style={general.wrapperFullWidth}>
                        {this.props.isLoading || this.state.isLoading ?
                            <Loading/>
                            :
                            this.props.news.length != 0
                            ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.props.news}
                                onEndReachedThreshold={5}
                                onEndReached={
                                    () => this.getMoreNews()
                                }
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.props.isRefreshing}
                                        onRefresh={
                                            () => this.props.homeAction.refreshNews()
                                        }
                                    />
                                }
                                ListFooterComponent={
                                    this.loadMore()
                                }
                                renderItem={({item}) => {
                                    return (<ListView item={item} navigation={this.props.navigation}/>)
                                }
                                }
                            />
                                :
                                <View style={[general.wrapperCenter, general.paddingLR]}>
                                    <Text style={[general.textTitleCard, general.marginTop, {textAlign: 'center'}]}>
                                        Không tìm thấy kết quả nào .
                                    </Text>
                                </View>
                        }

                    </View>
                    <SearchButton
                        function={() => this.toggleSearch()}/>
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.home.isLoading,
        news: state.home.news,
        isLoadingMore: state.home.isLoadingMore,
        isRefreshing: state.home.isRefreshing,
        isLoadingMoreSearch :state.home.isLoadingMoreSearch
    }
}

function mapDispatchToProps(dispatch) {
    return {
        homeAction: bindActionCreators(homeAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);