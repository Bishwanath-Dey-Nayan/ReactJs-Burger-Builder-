import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldvalidate && props.touched){
        inputClasses.push(classes.invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(" ")} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.change}
            />
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement}
             {...props.elementConfig}
              value={props.value}
              onChange={props.change}
              />
            break;
        case ('select'):
            inputElement = <select
                 className={classes.InputElement} 
                 value={props.value}
                 onChange={props.change}
                 >
                {props.elementConfig.options.map(option =>{
                    return(
                        <option value={option.value}>
                            {option.displayvalue}
                        </option>
                    )
                    })}
            </select>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
    }
    return (<div className={classes.Input}>
        <label className={classes.Lable}>{props.label}</label>
        {inputElement}
    </div>)
}

export default input;