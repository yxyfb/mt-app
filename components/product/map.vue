<template>
    <div id='container'
         :style="{width:width+'px',height:height+'px',margin: '52px auto'}"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            key: '2f1b8ea102431e62b34833c10454c7a9'
        }
    },
    props: {
        width: {
            type: Number,
            default: 230
        },
        height: {
            type: Number,
            default: 230
        }
    },
    computed: {
        ...mapGetters([
            'location'
        ])
    },
    mounted () {
        window.onLoad = () => {
            var map = new AMap.Map('container', {
                center: this.point,
                zoom: 11
            });
            this.map = map;

            //放大缩小
            map.plugin(["AMap.ToolBar"], function () {
                var toolBar = new AMap.ToolBar({
                    liteStyle: true
                })
                map.addControl(toolBar)
            });

            //图标点
            var marker = new AMap.Marker({
                position: this.point  // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            });

            this.marker = marker;
            // 将创建的点标记添加到已有的地图实例：
            map.add(marker);
        }
        var url = `https://webapi.amap.com/maps?v=1.4.15&key=${this.key}&callback=onLoad`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    },

    watch: {
        location (n, o) {
            this._location(n, o);
        },
        map () {
            this.location(n, o)
        }
    },
    methods: {
        _location (newLocation, oldLocation) {
            if (newLocation[0] === oldLocation[0] && newLocation[1] === oldLocation[1]) {
                return;
            }
            if (this.map) {
                this.map.setCenter(newLocation);//设置地图中心点
                this.marker.setPosition(newLocation);//设置新的点图标
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#container {
    border: 1px solid #e5e5e5;
    border-radius: 5px;
}
</style>