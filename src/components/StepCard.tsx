
import "./StepCard.css"

import { plans, picks } from "../db/db";
import { AddItem, elemento, planItem } from "../types";
import { useEffect, useMemo } from "react";


type StepCardProps = {
    step:number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    monthly: boolean,
    setMonthly: React.Dispatch<React.SetStateAction<boolean>>
    plan: planItem[],
    setPlan: React.Dispatch<React.SetStateAction<planItem[]>>
    adds: AddItem[],
    setAdds: React.Dispatch<React.SetStateAction<AddItem[]>>
}

function StepCard({step, setStep, monthly, setMonthly, plan, setPlan, adds, setAdds}: StepCardProps) {
    
    const addsTotal = useMemo(()=> adds.reduce((total, item) => total + item.value, 0),[adds])
    const planTotal = useMemo(()=> plan.reduce((valor, item) => valor + item.value,0),[plan])

    const total = addsTotal + planTotal;

    function planClick (arreglo:elemento){
        const plan = document.getElementById(String(arreglo.id));
        const planSelected = document.querySelector(".plan--active");

        if(planSelected){
            planSelected.classList.remove("plan--active");
            if(plan){
                plan.classList.add("plan--active");
            }

        }
        else{
            if(plan){
                plan.classList.add("plan--active");
            }
        }
        const price = monthly? (arreglo.priceM): (arreglo.priceY);
        const name = arreglo.plan
        const value = monthly? (arreglo.valueM): (arreglo.valueY);
        setPlan([{name, price, value}])
    }

    function addClick (arreglo:elemento){
        const id = arreglo.id;
        const pick = document.getElementById(String(id));
        const heading = arreglo.plan;
        const value = monthly? ( arreglo.valueM): (arreglo.valueY);
        if(pick){
            if(pick.classList.contains("pick--active")){
                pick.classList.remove("pick--active")
                const newAdds = adds.filter(add => add.id !== id)
                setAdds(newAdds)
            }else{
                pick.classList.add("pick--active")
                const price = monthly? (arreglo.priceM) : (arreglo.priceY)
                const add = {id,heading,price, value};
                const newAdds = [...adds, add]

                setAdds(newAdds)
                
            }
        }
    }

    function verificaAvanzar(){
        if(step === 1){
            const ExisteNombre = document.querySelector("#name")
            const ExisteNumero = document.querySelector("#number")
            const ExitseEmail = document.querySelector("#email")

            const Existe1 = ExisteNombre? (true) : false;
            const Existe2 = ExisteNumero? (true) : false;
            const Existe3 = ExitseEmail? (true) : false;
            if(Existe1 && Existe2 && Existe3){
                setStep(step+1)
            }
        }
        if(step === 2){
            const Existe = document.querySelector(".plan--active")
            if(Existe){
                setStep(step+1)
            }
        }
    }

    useEffect(() => {
      if(step === 3){
        setAdds([])
      }
    }, [setAdds, step])
    

  switch(step){
    case 1:
        return (
            <div className="stepCard">
                <div className="stepCard__container">
                    <div className="stepCard__meta">
                        <h1 className="stepCard__heading">Personal info</h1>
                        <p className="stepCard__text">Please provide your name, email address, and phone number.</p>
                    </div>
        
                    <form id="form" className="form">
                        <label htmlFor="name" className="form__label">Name</label>
                        <input className="form__input" type="text" id="name" placeholder="e.g. Stephen King" />
        
                        <label className="form__label" htmlFor="email">Email Address</label>
                        <input className="form__input" type="email" id="email" placeholder="e.g. stephenking@lorem.com" />
        
                        <label className="form__label" htmlFor="number"> Phone Number</label>
                        <input className="form__input" type="tel" id="number" placeholder="e.g. +1 234 567 890" />
                    </form>

                    <div className="stepCard__buton-container stepCard__buton-container--inside">
                    <button 
                        className="stepCard__buton"
                        onClick={() => verificaAvanzar()}
                    >
                        Next Step
                    </button>
                </div>
                </div>
        
                <div className="stepCard__buton-container">
                    <button 
                        className="stepCard__buton"
                        onClick={() => verificaAvanzar()}
                    >
                        Next Step
                    </button>
                </div>
            </div>
        
        
          )
    case 2:
        return (
            <div className="stepCard">
                <div className="stepCard__container">
                    <div className="stepCard__meta">
                        <h1 className="stepCard__heading">Select your plan</h1>
                        <p className="stepCard__text">You have the option of monthly or yearly billing.</p>
                    </div>

                    <div className="stepCard__plan-container">
                        {plans.map(plan => (
                            <div 
                                className="plan" 
                                key={plan.id}
                                onClick={() => planClick(plan)}
                                id={`${plan.id}`}
                            >

                                <div className="plan__img-container">
                                    <img src={plan.img} alt={plan.plan} />
                                </div>

                                <div className="plan__meta">
                                    <p className="plan__heading">{plan.plan}</p>
                                    {monthly? (
                                        <p className="plan__price">{plan.priceM}</p>
                                    ): (
                                        <>
                                            <p className="plan__price">{plan.priceY}</p>
                                            <p className="plan__text">2 months free</p>
                                        </>
                                    )}
                                </div>

                            </div>
                        ))}

                        <div className="change-price">
                            <p 
                                className={`change-price__text ${monthly?("change-price--active"):("inactive")}`}
                                onClick={() => setMonthly(true)}
                            >
                                Monthly
                            </p>
                            <div className="selector">
                                <div className="circle">

                                </div>
                            </div>
                            <p 
                                className={`change-price__text ${monthly?("inactive"):("change-price--active")}`}
                                onClick={() => setMonthly(false)} 
                            >
                                Yearly
                            </p>
                        </div>

                        <div className="stepCard__buton-container stepCard__buton-container--inside">
                    <button 
                        className="stepCard__buton stepCard__buton--last"
                        onClick={() => setStep(step-1)}
                    >
                        Last Step
                    </button>

                    <button 
                        className="stepCard__buton"
                        onClick={() => verificaAvanzar()}
                    >
                        Next Step
                    </button>
                </div>
                    </div>
        
                </div>
        
                <div className="stepCard__buton-container">
                    <button 
                        className="stepCard__buton stepCard__buton--last"
                        onClick={() => setStep(step-1)}
                    >
                        Last Step
                    </button>

                    <button 
                        className="stepCard__buton"
                        onClick={() => verificaAvanzar()}
                    >
                        Next Step
                    </button>
                </div>
            </div>
        
        
          )
    case 3:
        return(
            <div className="stepCard">
                <div className="stepCard__container">
                    <div className="stepCard__meta">
                        <h1 className="stepCard__heading">Pick add-ons</h1>
                        <p className="stepCard__text">Add-ons help enhance your gaming experience.</p>
                    </div>

                    <div className="stepCard__plan-container">
                       
                    <div className="pick--container">
                       
                        {picks.map(pick => (
                            <div 
                                className="pick" 
                                key={pick.id}
                                onClick={() => addClick(pick)}
                                id={`${pick.id}`}
                            >
                                <div className="square"></div>

                                <div className="pick__info">
                                    <h3 className="pick__heading">{pick.plan}</h3>
                                    <p className="pick__text">{pick.text}</p>
                                </div>

                                <div className="pick__price-container">
                                    <p className="pick__price">{monthly? (pick.priceM) : (pick.priceY)}</p>
                                </div>
                            </div>
                        ))}
                       

                       
                    </div>
                    <div className="stepCard__buton-container stepCard__buton-container--inside">
                    <button 
                        className="stepCard__buton stepCard__buton--last"
                        onClick={() => setStep(step-1)}
                    >
                        Last Step
                    </button>

                    <button 
                        className="stepCard__buton"
                        onClick={() => setStep(step+1)}
                    >
                        Next Step
                    </button>
                </div>
                    </div>
        
                </div>
        
                <div className="stepCard__buton-container">
                    <button 
                        className="stepCard__buton stepCard__buton--last"
                        onClick={() => setStep(step-1)}
                    >
                        Last Step
                    </button>

                    <button 
                        className="stepCard__buton"
                        onClick={() => setStep(step+1)}
                    >
                        Next Step
                    </button>
                </div>
            </div>
        )
    case 4:
        
        return(
            <div className="stepCard">
                <div className="stepCard__container">
                    <div className="stepCard__meta">
                        <h1 className="stepCard__heading">Finishing up</h1>
                        <p className="stepCard__text">Double-check everything looks OK before confirming.</p>
                    </div>
                    <div className="feedback">
                    
                        {plan.map( Element => (
                            <div className="feedback__meta" key={Element.name}>
                                <div key={Element.name}>
                                    <h3 className="feedback__heading">{Element.name} {monthly? ("(Monthly)") : ("(Yearly)")}</h3>
                                    <a className="feedback__link">Change</a>
                                </div>
                                <p className="feedback__meta-price">{Element.price}</p>
                            </div>
                            
                        ))}

                            <div className="feedback__adds">
                                {adds.map(add => (
                                    <div className="feedback__add" key={add.id}>
                                        <p className="feedback__add-name">{add.heading}</p>
                                        <p className="feedback__add-price">{add.price}</p>
                                    </div>
                                ))}
                            </div>
                        
                    
                <div/>

                
                </div>
                <div className="stepCard__total">
                    <p className="total__text">Total per {monthly?("month"): ("year")}</p>
                    <p className="total__price">$ {total}/{monthly? ("mo"): ("yr")}</p>
                </div>
                <div className="stepCard__buton-container stepCard__buton-container--inside">
                    <button 
                        className="stepCard__buton stepCard__buton--last"
                        onClick={() => setStep(step-1)}
                    >
                        Last Step
                    </button>

                    <button 
                        className="stepCard__buton stepCard__buton--confirm"
                        onClick={() => setStep(step+1)}
                    >
                        Confirm
                    </button>
                </div>
                </div>

                <div className="stepCard__buton-container">
                    <button 
                        className="stepCard__buton stepCard__buton--last"
                        onClick={() => setStep(step-1)}
                    >
                        Last Step
                    </button>

                    <button 
                        className="stepCard__buton stepCard__buton--confirm"
                        onClick={() => setStep(step+1)}
                    >
                        Confirm
                    </button>
                </div>
            </div>

        )
    case 5:
        return(
            <div className="stepCard">
                <div className="stepCard__container">
                    <div className="stepCard__meta--verified">
                        <div className="stepCard__img">
                            <img src="/images/icon-checkmark.svg" alt="" />
                        </div>
                        <h1 className="stepCard__heading">Thank you!</h1>
                        <p className="stepCard__text">Thanks for confirming your subscription! We hope you have fun 
                                using our platform. If you ever need support, please feel free 
                                to email us at support@loremgaming.com.</p>
                        
                    </div>
                </div>
            </div>
        )
  }
}

export default StepCard