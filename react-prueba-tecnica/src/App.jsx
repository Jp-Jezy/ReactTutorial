import { useEffect, useState } from "react"

const CAT_ENDPOINT_FACT=`https://catfact.ninja/fact`
export function App(){
    const [fact,setFact] = useState('')
    const [url,setUrl] = useState('Hola')

    useEffect(()=>{
        fetch(CAT_ENDPOINT_FACT)
            .then(res => res.json())
            .then(data=> setFact(data.fact))
    },[])
    
    useEffect(() => {
      
        if (fact) {
            const array = fact.split(' '); // Aquí corregí la sintaxis de split
            var text=(array[0]);
            setUrl(`https://cataas.com/cat/says/${text}?fontSize=20&fontColor=white&cat?json=true`)
        }
    }, [fact]);

    return(
        <main>
            <h1>App de gatos</h1>
            {fact && <p>{fact}</p>}
            <img src={url}></img>
        </main>
       
    )
}