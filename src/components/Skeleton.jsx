
const Skeleton = ({ item }) => {
    return [...Array(item).keys()].map((e) => (
      <div className="animate-pulse" key={e}>
        <div className="bg-gray-300 rounded-lg h-72"></div>
      </div>
    ))
  }
  
  export default Skeleton