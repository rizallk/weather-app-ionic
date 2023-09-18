import {
  IonContent,
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonMenu,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLoading,
  IonButton,
} from '@ionic/react';
import './style.scss';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const statusList = {
  process: 'process',
  success: 'success',
  not_found: 'not_found',
  error: 'error',
};

export default function Home() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('Manado');
  const [status, setStatus] = useState(statusList.process);

  useEffect(() => {
    setStatus(statusList.process);

    const fetchAPI = async () => {
      try {
        const { data } = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0ec3692582f6e4dd20947b76a2e0892d`
        );
        setData(data);
        setStatus(statusList.success);
      } catch (err) {
        err.response.status === 404
          ? setStatus(statusList.not_found)
          : setStatus(statusList.error);
      }
    };

    fetchAPI();

    location === '' ? setLocation('Manado') : null;
  }, [location]);

  return (
    <>
      <IonMenu side="start" contentId="main-content">
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          Aplikasi cuaca (weather app) adalah perangkat lunak yang digunakan
          untuk memberikan informasi tentang kondisi cuaca saat ini dan
          perkiraan cuaca di lokasi tertentu.
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="navbar">
              <div className="title">Weather App</div>
            </IonTitle>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSearchbar
            placeholder="Cari lokasi"
            inputMode="search"
            onIonChange={(e) => setLocation(e.detail.value)}
            onIonClear={(e) => setLocation('Manado')}
            onIonInput={(e) =>
              e.detail.value === '' ? setLocation('Manado') : null
            }
          ></IonSearchbar>
          <div className="searchbar-tip">
            Tekan enter pada keyboard untuk memulai pencarian
          </div>
          <IonCard className="info">
            <IonCardContent>
              {status === 'process' ? (
                <p className="middle">Loading ...</p>
              ) : null}
              {status === 'success' && data.cod === 200 ? (
                <>
                  <div className="location">{data.name}</div>
                  <div className="suhu">
                    <div className="main">
                      <div className="number">
                        {Math.round(data.main.temp - 273.15)}
                      </div>
                      <div className="celcius">
                        <span>°</span>
                        <span>C</span>
                      </div>
                    </div>
                    <div className="feels-like">
                      Feels like {Math.round(data.main.feels_like - 273.15)}
                      <sup>°</sup>
                    </div>
                  </div>
                  <div className="description">
                    <img
                      src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                      alt="Icon"
                    />
                    <div className="title">{data.weather[0].description}</div>
                  </div>
                </>
              ) : null}
              {status === 'not_found' ? (
                <p className="middle">Lokasi tidak ditemukan.</p>
              ) : null}
              {status === 'error' ? (
                <p className="middle">Terjadi kesalahan.</p>
              ) : null}
            </IonCardContent>
          </IonCard>
          <footer className="ion-padding">
            <p>Aplikasi ini dibuat oleh</p>
            <p>
              Nama : Mohalim Rizal Kadamong
              <br />
              NIM : 210211060138
            </p>
          </footer>
        </IonContent>
      </IonPage>
    </>
  );
}
