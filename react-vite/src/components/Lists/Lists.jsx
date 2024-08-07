import './Lists.css';

const List = ({ list }) => {

  return (
    <div className="list-card">
      <h3 className='list-title'>{list.name}</h3>
      {/* cards here */}
    </div>
  );
};

export default List;
