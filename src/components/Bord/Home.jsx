import React, { useEffect, useState } from 'react';
import './Homecss.css';


const App = () => {
    const [data, setData] = useState({
        score_team_1: 0,
        score_team_2: 0,
        name_team_1: "Team 1",
        name_team_2: "Team 2",
        team_1_score_street_1: 4,
        team_1_score_street_2: 2,
        team_1_score_street_3: 0,
        team_2_score_street_1: 4,
        team_2_score_street_2: 4,
        team_2_score_street_3: 4,
        team_score_street_main: 2,
    });
    const [timeLeft, setTimeLeft] = useState(120);
    const [timerInterval, setTimerInterval] = useState(null);
    const StreetContainer = ({ label, score }) => (
        <div className="houses_container">
            <div className={score === 4 ? 'triangle_green' : 'triangle'}></div>
            {[...Array(4 - score)].map((_, index) => (
                <div key={index} className="house_white"></div>
            ))}
            {[...Array(score)].map((_, index) => (
                <div key={index} className="house_green"></div>
            ))}
            <div className="street_label">{label}</div>
        </div>
    );

    const Skyscraper = ({ score }) => (
        <div className="houses_containerbig">
            <div className={score === 4 ? 'big_triangle_green' : 'big_triangle'}></div>
            {[...Array(4 - score)].map((_, index) => (
                <div key={index} className="big_house_white"></div>
            ))}
            {[...Array(score)].map((_, index) => (
                <div key={index} className="big_house_green"></div>
            ))}
            <div className="skyscraper_label">НЕБОСКРЕБ</div>
        </div>
    );
    const fetchData = async () => {
        try {
            const response = await fetch("http://193.164.149.85:5000/scores");
            const result = await response.json();
            setData(result[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {


        fetchData();
        const intervalId = setInterval(fetchData, 50); // обновляем данные каждые 5 секунд

        return () => {
            clearInterval(intervalId); // очищаем интервал при размонтировании компонента
        };
    }, []);
    const updateTimer = () => {
        const timerElement = document.getElementById("timer");

        if (!timerElement) {
            console.error("Элемент с id 'timer' не найден.");
            return;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        const formattedMinutes = ("0" + minutes).slice(-2);
        const formattedSeconds = ("0" + seconds).slice(-2);

        timerElement.textContent = formattedMinutes + ":" + formattedSeconds;

        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Время вышло!";
        }
    };

    useEffect(() => {
        // Fetch initial data
        fetchData();
    
        // Set up a 5-second interval to fetch data
        const intervalId = setInterval(fetchData, 5000);
    
        // Update or create the viewport meta tag
        const metaTag = document.querySelector('meta[name="viewport"]');
        if (metaTag) {
            // Update existing meta tag
            metaTag.content = 'width=device-width, initial-scale=1.0';
        } else {
            // Create a new meta tag if it doesn't exist
            const newMetaTag = document.createElement('meta');
            newMetaTag.name = 'viewport';
            newMetaTag.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(newMetaTag);
        }
    
        // Cleanup: clear the interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []); // Empty dependency array means this effect runs once on mount
    
    useEffect(() => {
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
    }, [timeLeft]);
    return (

        <div className="app">
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="main_background"></div>
            <div className="backroudn_for_titles"></div>
            <div className="title_left" style={{ position: 'absolute', top: '1.6%', left: '2%' }}>Робототехнический турнир “ТЕХНОДВИЖ” 2023/2024</div>
            <div className="separator" style={{ position: 'absolute', top: '.5%', left: '36.5%' }}></div>
            <div className="title_center" style={{ position: 'absolute', top: '1.6%', left: '50%', transform: 'translate(-50%)' }}>Товарищеский турнир ВАО</div>
            <div className="separator" style={{ position: 'absolute', top: '.5%', left: '63.5%' }}></div>
            <div className="title_right" style={{ position: 'absolute', top: '1.6%', left: '74%' }}>Квалификационный матч 1</div>
            <div className="logo_left"></div>
            <p className='VS'>VS</p>
            <div className="logo_right"></div>
    
            <div className="blue_upper_background_with_curve"></div>
            <div className="score_background"></div>
            <div className="blue_upper_background"></div>
            <div className="score">{`${data.score_team_1}:${data.score_team_2}`}</div>
      
            <div className="item_for_widing0">{data.name_team_1}</div>
            <div className="item_for_widing1">{data.name_team_2}</div>

            <div className="item">
                <div className="timer_background">
                    <div className="loader">
                        <div className="loading_1"></div>
                    </div>
                </div>
                <div className="timer">
                    <h1 id="timer" style={{ fontWeight: 'bold', fontSize: 'larger', zIndex: '11', position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>02:00</h1>
                </div>
            </div>
            < div className="street-container-1" >
                <StreetContainer score={data.team_1_score_street_1} />
                <div className='street-label'>Улица Медиа</div>
            </div>

            <div className="street-container-2">
                <StreetContainer score={data.team_1_score_street_2} />
                <div className='street-label'>Улица Первых</div>
            </div>

            <div className="street-container-3">
                <StreetContainer score={data.team_1_score_street_3} />
                <div className='street-label'>Улица Истории</div>
            </div>

            <div className='street-container-4' >
                <StreetContainer score={data.team_2_score_street_1} />
                <div className='street-label'>Улица Медиа</div>
            </div>

            <div className='street-container-5' >
                <StreetContainer score={data.team_2_score_street_2} />
                <div className='street-label'>Улица Первых</div>
            </div>

            <div className='street-container-6' >
                <StreetContainer score={data.team_2_score_street_3} />
                <div className='street-label'>Улица Истории</div>
            </div>

            <div className="skyscraper-container" >
                <Skyscraper score={data.team_score_street_main} />
            </div>

        </div>
    );
}

export default App;
