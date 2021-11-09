/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "../fabrictool";
const fabric = require('fabric').fabric;

class Select extends FabricCanvasTool {
    configureCanvas(props) {
        // console.log(props);
        let canvas = this._canvas;

        var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

        var cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A"

        var playIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAABWVlbu7u76+vp+fn7V1dX8/Pzg4ODZ2dm2traurq7z8/NhYWE1NTWxsbHp6elPT08pKSmZmZnMzMyKiopJSUm/v7+jo6Nvb28dHR1BQUE8PDwxMTEVFRWVlZVnZ2d3d3fGxsYMDAwaGhqNjY2oWGuzAAAEmUlEQVR4nO3di1LiQBCFYQ4QV0FQUEBuShZ8/1fcuFvWinLJJH05SfX/BPmqqGHohEmnE0VRFEVRFEVRFEVRFEVRFMnVv/e+AsXuXkYrfDTOHnreFyPf4/s/3WeTQd/7kkTrZfjRdOh9VYINf/o+Wt95X5hQ/dFpYFHWio9qb30WCBwG3pdXv/vtBWBR99H7Cuu2uQwsevK+xHrlV4HA9tn7Kmu0KAEsyhq70+mvruv+9vrgfakVeyoJLJo0c8UpDyx6++V9uekNkoRNXHEmaUJg2bA9Ti8VWNSsFee5ghCTJm3HX6oIgZn3dZdvWU2IVWNWnPO/mq61a8iUo1tZCDRjAFBHiHkTVpxawmI7zr/HqSnEauEtuFZdITAiX3HqC4EXb8TFJIQY33gzLiQiLPY4vAMAISFWtCNHKSHvyFFOCDxRfjlKCjlXHFEhkPMNAISFAN2KIy5E99bbdJy8EHjzRh2lIcSUaQCgIgSWPNtxJSHRyFFNiAnJiqMnZBk5agqx+u3N6ygLKUaOykKCkaO6EBvnkaO+sFhxXLfjFkJMPUeOJkLXkaOR0HHkaCbExmkAYCf0uslhKQQ8VhxbIUb223FjocNTjuZC85GjvRDITW9yeAixtxw5ughNR45OQsORo5vQbOToJwSWJiuOpxB7i5GjqxCY6684zsJixdEeALgLsVUeOfoLgZ3qisMg1B05cgg1n3IkEQIzrQEAjRBQ+uIgEirNOJiEOrfjqIQYtV6oQSQTKnxQ2YTyyw2dENJbOD5h3nohhJ/EJRRmrRe+yv4mJhRC9icxo1D2Y8oonLdeCNHHGiiFot8XlELRkQalUPSOBqVQ9C4xpVB0YkMpbP1KMxX9AcUolB1lMAplH7lhFMpO+AmFa1Ego1D4YRtCoSyQUCg9TqQT7oSBdMKD+CPvbEL5RzPJhArPZXAJNR48YRJuVe5zEwmFZ910wrXW498sQr0/DXEIR4onvzAID6rP7hEI1Z6GIhGqnxTqLdT/I7Sv0OLEXk+hzanLjkKjg7PchGannzsJDQ+w8xFavoXAQ2j7H0sHofE/882F5ue5GAsdDuW1FSpvst2FPmdjGQqdThsyE7qdUWckdDxn0EboeVakhdDhuA9bofOZrepC93cLKAu9jk4yEzKcuK8p5Hhrgp7Q9Ri6L6kJ31lO9lYSEr2BRkfofqTnlzSENqeylE1eOGY6zLujIOQ6kL0jLiR8jYeo8JXuxQgdWSHn+3TlhFuer8CjxIQMm+yTCQl3fCvMZyLCPcPp8ueSEHK8IeBc9YUGR67VqraQaZN9sppCrk32yWoJ2TbZJ6sj5HzP2veqvw+Y7c1V58qqAknmTNd7qObLWOZM17up4lN7JlulfTqQdpN9ujzVxzHJTug5zccyyU5pnAKkmWSntCjvWzfkK/B7Zbc1e/pN9rluywHzpq0wXxqW8FG9ljK961s3ukl2asvLPsJJdnKzC74D4yQ7vcFZIOFrmqv1ePpLY006ya7UYv7Dt2nHB/R/N9nRL42cedBbudvh2647n49mwzZ9PKMoiqIoiqIoiqIoiqIoiqLm9QfLUFe4shG+ygAAAABJRU5ErkJggg=="

        var muteIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mute_Icon.svg/1200px-Mute_Icon.svg.png";

        var stopIcon = "https://cdn2.iconfinder.com/data/icons/media-controls-5/100/pause-512.png";

        var deleteImg = document.createElement('img');
        deleteImg.src = deleteIcon;

        var cloneImg = document.createElement('img');
        cloneImg.src = cloneIcon;

        var playImg = document.createElement('img');
        playImg.src = playIcon;

        var muteImg = document.createElement('img');
        muteImg.src = muteIcon;

        var stopImg = document.createElement('img');
        stopImg.src = stopIcon;

        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = 'blue';
        fabric.Object.prototype.cornerStyle = 'circle';

        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.forEachObject((o) => {
            o.selectable = o.evented = true;
        });

        fabric.Object.prototype.controls.MuteVideo = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: this.muteObject,
            render: this.renderIcon(muteImg),
            cornerSize: 24
        });

        fabric.Object.prototype.controls.playVideo = new fabric.Control({
            x: -0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: -16,
            cursorStyle: 'pointer',
            mouseUpHandler: this.playObject,
            render: this.renderIcon(playImg),
            cornerSize: 24
        });

        fabric.Object.prototype.controls.stopVideo = new fabric.Control({
            x: -0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: -16,
            cursorStyle: 'pointer',
            mouseUpHandler: this.stopObject,
            render: this.renderIcon(stopImg),
            cornerSize: 24
        });

        const objectSelected = canvas.getActiveObject();

        if (objectSelected?.objectType === 'video') {
            let element = objectSelected.getElement();

            objectSelected?.setControlsVisibility({
                MuteVideo:true,
                playVideo:true,
                stopVideo:true
            })

            if (element.paused || element.ended) {
                element.play();
                objectSelected?.setControlsVisibility({
                    playVideo:false,
                    stopVideo:true
                })
            } else {
                objectSelected?.setControlsVisibility({
                    stopVideo:false,
                    playVideo:true
                })
            }
        } else {
            objectSelected?.setControlsVisibility({
                MuteVideo:false,
                playVideo:false,
                stopVideo:false
            })
        }
    }

    deleteObject = (eventData, transform) => {
        var target = transform.target;
        let canvas = this._canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
    }

    cloneObject = (eventData, transform) => {
        var target = transform.target;
        let canvas = this._canvas;
        target.clone(function (cloned) {
            cloned.left += 10;
            cloned.top += 10;
            canvas.add(cloned);
        });
    }

    playObject = (eventData, transform) => {
        var target = transform.target;
        let canvas = this._canvas;
        let element = target.getElement();
        console.log(element,'playObject');
        if (element.paused || element.ended) {
            console.log('a');
            element.play();
            target?.setControlsVisibility({
                playVideo:false,
                stopVideo:true
            })
        }
    }

    stopObject = (eventData, transform) => {
        var target = transform.target;
        let canvas = this._canvas;
        let element = target.getElement();
        console.log(element,'stopObject');

        if (element.play) {
            element.pause();
            target?.setControlsVisibility({
                stopVideo:false,
                playVideo:true
            })
        }
    }

    muteObject = (eventData, transform) => {
        var target = transform.target;
        let canvas = this._canvas;
        let element = target.getElement();
        element.muted = !element.muted;
    }

    renderIcon = (icon) => {
        return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(icon, -size/2, -size/2, size, size);
            ctx.restore();
        }
    }
}

export default Select;
