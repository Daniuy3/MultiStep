import "./ShowSteps.css";

const steps = [
    {
        id:1,
        Step: 1 ,
        info: "Your info"
    },
    {
        id:2,
        Step: 2,
        info: "Select plan"
    },
    {
        id:3,
        Step: 3 ,
        info: "Add-ons"
    },
    {
        id:4,
        Step: 4 ,
        info: "Summary"
    }
]

type ShowStepsProps = {
    step : number
}

function ShowSteps({step}: ShowStepsProps) {
    
    
  return (
    <div className="step">
        <div className="step__container">
        {steps.map(element => (
            <div
                className="step__circle"
                key={element.id}
            >
                <p className={`step__number ${element.Step === step ? ("active"): ("inactive")}`}>{element.Step}</p>
                <div>
                    <p className="step__meta">Step {element.Step} <span>{element.info}</span></p>
                </div>
            </div>        
        ))}
        </div>
    </div>
  )
}

export default ShowSteps