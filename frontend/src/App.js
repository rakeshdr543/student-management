import { useState, useEffect } from 'react';
import axios from 'axios'

import Student from './components/Student';

const rootUrl = 'http://localhost:5000';

function App() {
  const [students,setStudents]=useState([])
  const [loading,setLoading]=useState(false)
  const [page, setPage] = useState(1)

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > students.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = 1
      }
      return prevPage
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const url = `${rootUrl}/api/v1/students?page=${page}`;
      // const url = `/api/v1`;
     const fetchedProducts=await axios.get(url)
     console.log(fetchedProducts.data.students)
     setLoading(false)
     setStudents(fetchedProducts?.data?.students)
    };
  fetchProducts()
  }, [page])
console.log(students)
  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'Student Management'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {students?.length && students?.map((student) => {
            return <Student key={student._id} {...student} />
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {page}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
