import React, { Component } from 'react'
import './index.scss'
export default class Map extends Component {
    componentDidMount() {
        var map = new window.BMap.Map("container");
        var point = new window.BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(true)


        var myCity = new window.BMap.LocalCity();
        myCity.get(result => {
            var cityName = result.name;
            map.setCenter(cityName);
            alert("当前定位城市:" + cityName);
        });
    }
    render() {
        return (
            <div className='map-wrapper'>
                <div id="container"></div>
            </div>
        )
    }
}
