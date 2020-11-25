import { getCityInfo } from '../api'
export default function getcity() {
    return new Promise((resolve, reject) => {
        const city = JSON.parse(localStorage.getItem('currentCity') || "{}")
        if (city.babel) {
            resolve(city)
        } else {
            var myCity = new window.BMap.LocalCity();
            myCity.get(async result => {
                var cityName = result.name;
                const { data: { body } } = await getCityInfo(cityName)
                localStorage.setItem('currentCity', JSON.stringify(body))
                resolve(body)
            });
        }
    })

}