import { useEffect, useState } from "react"
import { cambiarFact } from "../services/facts"

function useCatImage ({fact}){
    const [url,setUrl] = useState('Hola')
    useEffect(() => {
  
        if (fact) {
            const array = fact.split(' '); // Aquí corregí la sintaxis de split
            var text=(array[0]);
            setUrl(`https://cataas.com/cat/says/${text}?fontSize=20&fontColor=white&cat?json=true`)
      
        }
        
    }, [fact])
    return {url}
} // devuelve url

export function App(){

    const [fact,setFact] = useState('')
    const {url} = useCatImage({fact})
    
    useEffect(()=>{
        cambiarFact().then(setFact)
    },[])
    
   
    
    async function handleClick() {
        let facto = await cambiarFact()
        setFact(facto)
    }

    return(
        <main>
            <h1>App de gatos</h1>
            <button onClick={handleClick}>Get new fact</button>
            {fact && <p>{fact}</p>}
            <img src={url}></img>
        </main>
       
    )
}