import React,{ useContext, useEffect, useState} from 'react'
import axios from 'axios'


const CreateAuctionsView = () => {
  
  const [formData, setFormData] = useState({SkapadAv: "", Title: "", Beskrivning: "", StartDatum:"", SlutDatum: "", Utropspris: 0,  "Gruppkod": 2460});

        const onchange = (e) => {setFormData({...formData, [e.target.id]:e.target.value})} 

        
     const onSubmitHandler = async(e) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

       e.preventDefault()
       console.log(formData)
     
      const response = await axios.post("http://nackowskis.azurewebsites.net/api/Auktion/2460",formData
      )
      
     }

  return (
    //<div><h1>Create auction view</h1></div>
    <form onSubmit={onSubmitHandler}>
    <div className="newAuction">

        <h3>Add a new auction</h3>
        <div className="seller">
            <label html for="SkapadAv">Sold by:</label><br />
            <input type="text" id='SkapadAv' onChange={ onchange
            } />
        </div>
        <div className="title">
            <label html for="Title">Titel:</label><br />
            <input type="text" id='Title' onChange={ onchange
            } />
        </div>
        <br />
        <div className="description">
            <label html for="Beskrivning">Description:</label><br />
            <input type="text" id='Beskrivning' onChange={ onchange
            } />
        </div>
        <br />
        {/* <div className="startDate">
            <label html for="StartDatum">Start date:</label><br />
            <input type="date" id='StartDatum' onChange={ onchange
            } />
        </div> */}
        <br />
        {/* <div className="dueDate">
            <label html for="dueDate">End date:</label><br />
            <input type="date" id='SlutDatum' onChange={ onchange
              } />
        </div> */}
        <br />
        {/* <div className="acceptedPrice">
            <label html for="acceptedPrice">Starting price:</label><br />
            <input type="number" id='Utropspris' onChange={ onchange
            } />
        </div> */}
        <br />
        <br />
        <br />
        <div className="createAuction">
            <button className="createAuctionbtn" type="submit" >Add</button>
        </div>
    </div>
    </form>
  )
}

export default CreateAuctionsView