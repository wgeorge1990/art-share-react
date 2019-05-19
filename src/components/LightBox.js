import React from 'react'
import Lightbox from 'react-images';

export default class Sample extends React.Component { 
    state = {

        
    }

    render() {
        console.log('inside of lightbox:', this.props.art)
        const imageArray = this.props.art.map(art => art.img)
        console.log(imageArray[0])
        const imageScrObjects = [{ src: imageArray[0] }, { src: imageArray[1] }]
        console.log(imageScrObjects)

        const frame = () => {
            let counter = 0
            let o = { src: imageArray[counter] }
            counter += 1
            return o
        }

        return (
            <Lightbox
                images={[ frame() ]}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNextLightboxImage}
            />
        );
    }
}