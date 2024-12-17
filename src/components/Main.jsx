import { useDispatch, useSelector } from "react-redux";
import { setSelectedService, getEmail, getPriceCount} from '../store/email/email';
import ServicesSelect from "./ServicesSelect";

const Main = () => {
  const dispatch = useDispatch();
  const { priceData, service, selectedService, domen, error} = useSelector((state) => state.email);
  const selectServiceHandler = (id)=>{
    dispatch(setSelectedService(id))
    dispatch(getPriceCount(id))
  }

  return (
    <div className="services-sidebar">
      <div className="services-sidebar-section buy-number">
        <ServicesSelect />
        <div className="services-sidebar-section__body services-sidebar__services --more">
          {
            service && service.map((elem)=>(
              <div 
                className={ elem.id == selectedService ? "--selected" : ''} 
                onClick={()=>{selectServiceHandler(elem.id)}}
                key={elem.id}>
                <img src={elem.img}/>
              </div>
            ))
          }
        </div>
        <div className="services-sidebar-section__footer"></div>
      </div>
      <div className="services-sidebar-section">
        <div className="services-sidebar-section__body services-sidebar__countries --more">
          <div className="services-sidebar-country">
            <div className="services-sidebar-country__item">
            {
              !error ? 
                <>
                  <img src="https://smsbower.net/img/svg/mails_icons/1.svg" className="--image"/>
                  <div className="--name">
                    Gmail
                  </div>
                  {
                    priceData && (
                      <div className="--info">
                        <p>от {priceData.data[selectedService][domen].price} ₽</p>
                        <p>{priceData.data[selectedService][domen].count} шт</p>
                      </div>
                    )
                  }
                  <div className="--button">
                    <button className="button primary" onClick={()=>{ dispatch(getEmail())}}>
                      Купить
                    </button>
                  </div>

                </>
              :  error && <div className="--name">{error}</div>
            }
          </div>
          </div>
        </div>
        <div
          data-v-041c2d1d=""
          className="services-sidebar-section__footer"
        ></div>
      </div>
    </div>
  );
};

export default Main;

