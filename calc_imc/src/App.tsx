import { useState } from 'react';
import styles from './App.module.css';
import logoImage from './assets/logo.png'
import leftArrow from './assets/leftarrow.png'
import { calculateimc, level, levels } from './helpers/imc';
import { GridItem } from './components/GridItem';



const App = () => {

  const [ heightField, setHeightField ] = useState<number>(0);
  const [ weightField, setWeightField ] = useState<number>(0);
  const [toShow, setToShow] = useState<level | null>(null)

  const handleCalculateButton = () => {
      if (heightField && weightField){
        setToShow(calculateimc(heightField, weightField))
      } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleBackArrow = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>

      <header>
        <div className={styles.headerContainer}>
        <img src={logoImage} width={150}></img>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>O IMC é usado para determinar peso ideal e gradações que indicam magreza, sobrepeso e obesidade. O Índice de Massa Corporal (IMC) é uma das principais ferramentas, adotada inclusive pela Organização Mundial de Saúde (OMS), para calcular o chamado “peso ideal”.</p>
         
          <input
          type='number'
          placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
          value={heightField > 0 ? heightField : ''}
          onChange={event => setHeightField(parseFloat(event.target.value))}
          disabled={toShow ? true : false}
          />

          <input
          type='number'
          placeholder='Digite o seu peso. Ex: 63.5 (em kg)'
          value={weightField > 0 ? weightField : ''}
          onChange={event => setWeightField(parseFloat(event.target.value))}
          disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>

        </div>
        <div className={styles.rightSide}>

          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key)=>(
              <GridItem key = {key} data= {item}/>
            ))}
          </div>
          }

          {toShow &&
          <div className={styles.showImc}>
            <div className={styles.backArrow} onClick={handleBackArrow}>
              <img src={leftArrow} alt='' width={25}/>
            </div>
            <GridItem data={toShow}/>
          </div>
          }
        </div>

      </div>
      </div>
  )
}

export default App;