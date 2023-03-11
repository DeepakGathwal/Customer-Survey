
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const allQuestions = [
  {id:1,ques:" How satisfied are you with our products ?", rating:[1,2,3,4,5]},
  {id:2,ques:"How fair are the prices compared to similar retailers ?", rating:[1,2,3,4,5]},
  {id:3,ques:" How satisfied are you with the value for money of your purchase ?", rating:[1,2,3,4,5]},
  {id:4,ques:"On a scale of 1-10 how would you recommend us to your friends and family ?", rating:[1,2,3,4,5,6,7,8,9,10]},
  {id:5,ques:"What could we do to improve our service ?", rating:[0]}
]

function App() {
  const [getData,setData]=useState(1)
  const [posts,setPosts] = useState([])
  const [finaldata,setFinalData] = useState([])
  const [Userid,setUserID] = useState([])
  const [show, setShow] = useState(false);
  const [thanku,setThanku]=useState(false)
  const [welcome,setwelcome]=useState(false)
  const [inputText, setInputText] = useState('')
  const handleClose = (e) => {
    setShow(false)
    finaldata.push({Userid:Userid})
    const value =  allQuestions.filter((el) => el.rating == 0)
    finaldata.push({question :value[0].ques, Ans:inputText})
  if(e == "Close"){
    finaldata.push({status:"Panding"})
    const data =  JSON.stringify(finaldata)
    localStorage.setItem("Data",data)
  }else if(e == "Continue"){
    finaldata.push({status:"Continue"})
    const data =  JSON.stringify(finaldata)
    localStorage.setItem("Data",data)
    setThanku(true)
    setTimeout(() => {
      setThanku(false)
      setwelcome(false)
    },5000)
  }
  };


  const nextState =  (e) => {
    
    const data =  allQuestions.filter((el) => el.id == getData)
    const UserID = Math.floor(Math.random() * (10000 - 0)) + 0;
    setUserID(UserID)
    return setPosts(data)

  }
const getRating = (e,k) => {
 setFinalData(cat => [...cat,{question :k, rating:e}]) 
}
useEffect(() => {
nextState()
},[getData])

  return (
    <>
{welcome ? <>
    {!thanku ? <div className="container bg-info rounded-5 mt-5 p-5 border-5 border-dark">
	<h2 className="text-black text-center">Customer Survey</h2>
     {posts.map((el,i) =>  (
     <div key={i} className="text-center p-5 m-5">
      <span className='float-xl-end text-black'>{el.id}/5</span>
<div className='d-flex justify-content-center'>
 <h3 className='mt-5 text-black'>{el.id} : </h3>
 
  <h3 className='mt-5 ms-3 text-black'>{el.ques}</h3>

</div>
 {el.rating.map((buttonLabel,l) => (
 <>
 {buttonLabel === 0 ? <input className='h-100 rounded-2 ms-5 me-5 p-2 w-50 mt-3' type="text" placeholder="Give Your Review"  value={inputText}  onChange={(e) => setInputText(e.target.value)}/> :
 <Button  className='justify-content-end m-2 mt-3 rounded-5  border-black text-dark logo-img'  aria-expanded={el.select} onClick={(e,k) => getRating(l+1, el.ques)} >{l+1}</Button>  }
</>
 ))}
     </div >
     ))}

     <Button className='bg-primary text-white' onClick={(e) => nextState(getData != 1 && setData(getData - 1))}>Prev</Button>
 { posts[0].id == 5 ?  <Button className='float-xl-end bg-danger border-danger' onClick={() => setShow(true)}>Sumbit</Button> :<Button className='float-xl-end bg-danger border-danger' onClick={(e) => nextState(getData !== 5 && setData(getData + 1))}>Next</Button>}
    
    </div>
	: <h1 className='text-center m-auto mt-5 pt-5'>thanku</h1>}
  </>:<>
  <div className='container-fluid'>
<div>  <h1 className='text-center m-auto mt-5 pt-5'>Welcome</h1></div>
<div className='text-center mt-5'>  <Button onClick={() => setwelcome(true)}>Survey the Customers In A Shop</Button></div>
  </div>
  </>}
    <Modal show={show} onHide={() => handleClose()}>
    <Modal.Header>
      <Modal.Title>Submit The Survey</Modal.Title>
   
     <Modal.Footer>
     <Button className='bg-primary text-white' variant="primary" onClick={(e) => handleClose("Close")}>
        Close
      </Button>
      <Button variant="danger" className='bg-danger text-white' onClick={(e) => handleClose("Continue")}>
      Continue
      </Button>
     </Modal.Footer>
    </Modal.Header>
  
  </Modal>

  </>
  );
}

export default App;
