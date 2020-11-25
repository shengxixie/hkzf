import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';
import { getCityList, getHotCity } from '../../api'
import getCityInfo from '../../utils/getCityInfo'
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './index.scss'

// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

function dealCityListData(list) {
    const citylist = {}
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let initialWord = item.short.substr(0, 1).toUpperCase()
        if (citylist[initialWord]) {
            citylist[initialWord].push(item)
        } else {
            citylist[initialWord] = [item]
        }
    }
    const firstLetter = Object.keys(citylist).sort()
    return { citylist, firstLetter }
}
export default class CityList extends Component {
    state = {
        citylist: {},
        firstLetter: [],
        activeIndex: 0
    }
    componentDidMount() {
        this.getCityList()
    }
    async getCityList() {
        const { data: { body } } = await getCityList()
        const { data: { body: hotCity } } = await getHotCity()
        const { citylist, firstLetter } = dealCityListData(body)
        firstLetter.unshift('hot')
        citylist['hot'] = hotCity
        const currentCity = await getCityInfo()
        firstLetter.unshift('#')
        citylist['#'] = [currentCity]
        this.setState({ cityList: citylist, firstLetter })
    }
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const word = this.state.firstLetter[index];
        const list = this.state.cityList[word];
        let title = '';
        switch (word) {
            case '#':
                title = '当前城市';
                break;
            case 'hot':
                title = '热门城市';
                break;
            default:
                title = word.toUpperCase();
                break;
        }
        return (
            <div key={key} style={style} className="city">
                <div className="title">{title}</div>
                {list.map((item, i) => (<div key={i} className="name">{item.label}</div>))}
            </div>
        )
    }
    renderCityIndex() {
        return this.state.firstLetter.map((v, i) =>
            <li className='city-index-item' key={i}>
                <span className={this.state.activeIndex === i ? 'index-active' : ''}>{v === 'hot' ? '热' : v.toUpperCase()}</span>
            </li>
        )
    }
    getRowHeight = ({ index }) => {
        const letter = this.state.firstLetter[index];
        const list = this.state.cityList[letter];
        return TITLE_HEIGHT + NAME_HEIGHT * list.length

    }

    render() {

        return (
            <div className='citylist-wrapper'>
                <NavBar
                    mode="light"
                    icon={<i className='iconfont icon-back' />}
                    onLeftClick={() => this.props.history.go(-1)}
                >选择城市</NavBar>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={this.state.firstLetter.length}
                            rowHeight={this.getRowHeight}
                            rowRenderer={this.rowRenderer}
                        />
                    )}
                </AutoSizer>
                <ul className="city-index">
                    {
                        this.renderCityIndex()
                    }
                </ul>
            </div>
        )
    }
}
