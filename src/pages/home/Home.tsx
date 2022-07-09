import './Home.css';

export default function Home(): JSX.Element{
  return(
    <main className="page">
      <div className="page__container">
        <form action="" className="page__search-form">
          <input type="text" />
          <button type="submit" >Search</button>
        </form>

        <section className="data">
          <div className="data-daily">
            <h2 className="data-daily__date">12/12/2022</h2>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>
          </div>

          <div className="data-daily">
            <h2 className="data-daily__date">12/12/2022</h2>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>
          </div>

          <div className="data-daily">
            <h2 className="data-daily__date">12/12/2022</h2>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}