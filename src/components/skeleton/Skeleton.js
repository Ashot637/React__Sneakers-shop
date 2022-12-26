import './skeleton.scss'

const Skeleton = () => {
    return(
        <div className="skeleton__grid">
            <SingleSkeleton/>
            <SingleSkeleton/>
            <SingleSkeleton/>
            <SingleSkeleton/>
        </div>  
    )
}

const SingleSkeleton = () => {
    return (
        <div className="skeleton">
            <div className="pulse skeleton__header"></div>
            <div className="pulse skeleton__title"></div>
            <div className="pulse skeleton__subtitle"></div>
            <div className="pulse skeleton__down">
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__btn"></div>
            </div>
        </div>
    )
}

export default Skeleton;