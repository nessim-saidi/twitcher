import ReactPlayer from 'react-player';

const Video = () => {
    return (
        <>
            <div className="video-container">
                <ReactPlayer 
                    className="video-box" 
                    url={"https://www.youtube.com/watch?v=xyiuBEBv0_0"}
                    muted={true}
                    playing={true}
                    width={'100%'}
                    height={'100%'}
                    controls={true}
                />
            </div>
        </>
    );
};

export default Video;