import { useParams } from 'react-router-dom';

const SelectCategoryPage = () => {
  const { name } = useParams();

  return (
    <div className='mt-20'>
      <h2 className='text-3xl font-semi-bold'>Welcome, {name}!</h2>
      {/* Other content of the page */}
      <div className='mt-5 flex flex-wrap justify-center text-center items-center ml-96 max-sm:ml-5' style={{width: "550px"}}>
          <div className='marr'>
              <input type='checkbox' name='name'/>
              <label for="name" className='text-lg'>Name</label>
          </div>

          <div className='marr'>
              <input type='checkbox' name='place'/>
              <label for="place" className='text-lg'>Place</label>
          </div>

          <div className='marr'>
              <input type='checkbox' name='animal'/>
              <label for="animal" className='text-lg'>Animal</label>
          </div>

          <div className='marr'>
              <input type='checkbox' name='thing'/>
              <label for="thing" className='text-lg'>Thing</label>
          </div>

          <div className='marr'>
              <input type='checkbox' name='song'/>
              <label for="song" className='text-lg'>Song</label>
          </div>

          <div className='marr'>
              <input type='checkbox' name='fruits'/>
              <label for="fruits" className='text-lg'>Fruits</label>
          </div>

          <div className='marr'>
              <input type='checkbox' name='subject'/>
              <label for="subject">Subject</label>
          </div>

          <div className='marr'>
              <input type='checkbox' name='celebrities'/>
              <label for="celebrities"  className='text-lg'>Celebrities</label>
          </div>


      </div>

      <button className='mt-5 bg-blue-900 text-white w-64 h-16 text-xl'>Create Room</button><br/>
      <button className='mt-5 bg-gray-900 text-white w-64 h-16 text-xl'>Cancel</button>

    </div>
  );
};

export default SelectCategoryPage