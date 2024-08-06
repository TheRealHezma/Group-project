import './Lists.css';

const List = ({ list }) => {
  console.log('List component received:', list); // Debugging line

  return (
    <div className="list-card">
      <h3 className='list-title'>{list.name}</h3>
      {/* cards here */}
    </div>
  );
};

export default List;
