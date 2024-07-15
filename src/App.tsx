
import { useState, useEffect } from 'react'
import './App.css'
import ShowSteps from './components/ShowSteps';
import StepCard from './components/StepCard';
import { AddItem, planItem } from './types';
function App() {

  const [step, setStep] = useState(1)
  const [monthly, setMonthly] = useState(true);
  const [plan, setPlan] = useState<planItem[]>([]);
  const [adds, setAdds] = useState<AddItem[]>([])

    useEffect(() => {
        const CircleExists = document.querySelector(".circle");

        if(CircleExists){
            if(monthly){
                setTimeout(() => {
                    CircleExists.classList.remove("circle--active")
                }, 10);
            } else{
                setTimeout(() => {
                    CircleExists.classList.add("circle--active")
                }, 10);
            }
        }
    
    }, [monthly, step])

  return (
    <>
      <ShowSteps
        step={step}
        
      />

      <StepCard
        step={step}
        setStep={setStep}
        monthly = {monthly}
        setMonthly = {setMonthly}
        plan = {plan}
        setPlan = {setPlan}
        adds = {adds}
        setAdds = {setAdds}
      />
    </>
  )
}

export default App
