import axios from "axios";
import { useEffect, useState } from "react";
import s from './Purchases.module.css';

const Purchases = () => {

    const [state, setState] = useState(null);

    const getAllOrders = async () => {
    const result = await axios.get("/getAllOrders")
    setState(result.data)
    // console.log(result.data)
    }

    useEffect(()=>{
        if(!state)
        getAllOrders()
    },[state])

    return(
        <>
            <h1 className={s.title}>Purchases</h1>
            <div className={s.div2}>
                {
                    state?.map((e) => {
                        return(
                            <div key={e.id} className={s.div}>
                                <h3>Course: {e.name}</h3>
                                <h3>Name: {e.users[0]?.fullName}</h3>
                                <h3>Price: {e.price}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
        
        
    )
}

export default Purchases;