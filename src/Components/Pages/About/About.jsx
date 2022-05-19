import React from 'react'

import cl from './About.module.css'

import {Container, Row} from 'react-bootstrap'

const About = () => {
  return (
    <Container>
        <div className={cl.Title}>О нас: </div>
            <div className={cl.Wrapper}>
                <hr />
                <div className={cl.Text}>
                    Команда из одного человека...
                </div>
            </div>
        <div className={cl.Title}>Специальное спасибо: </div>
            <div className={cl.Wrapper}>
                <hr />
                <div className={cl.Text}>
                    Научный руководитель - Тинекова Е.С.
                </div>
                <div className={cl.Text}>
                    Советник по планированию работ - Каратаев А.А.
                </div>
                <div className={cl.Text}>
                    Советник по написанию дипломной работы - Гайдукова-Малеван К.М.
                </div>
            </div>
        <div className={cl.Title}>Список используемого: </div>
            <div className={cl.Wrapper}>
                <hr />
                <div className={cl.SubTitle}>Сервер: </div>

                <code className={cl.SubText}>NodeJS + Express + MongoDB + CloudinaryAPI</code>

                <div className={cl.SubTitle}>Клиент: </div>

                <code className={cl.SubText}>React + dataFetch(Axios) + ReactQuery</code>
            </div>
        <div className={cl.Title}>Список сочетаний клавиш: </div>
            <div className={cl.Wrapper}>
                <hr />
                <div className={cl.SubTitle}>Плеер: </div>

                <div className={cl.SubText}><kbd>space</kbd> - Остановить/Продолжить воспроизведение трека</div>
                <div className={cl.SubText}><kbd>m</kbd> - Выключить звук</div>
                <div className={cl.SubText}><kbd>←</kbd> / <kbd>→</kbd> - Перемотка трека на 5 секунд в лево/право</div>
            </div>
    </Container>
  )
}

export default About