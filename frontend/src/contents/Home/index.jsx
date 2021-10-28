import React from 'react'

const Home = () => {
    return (
        <>
            <section style={{marginTop:'50px'}}>
                <div className="position-relative overflow-hidden p-3 p-md-5 text-center homebg">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 fw-normal">Web Document Keeper</h1>
                        <p className="lead fw-normal">A safe platform to keep your document in the cloud and can access your documents anytime anywhere.</p>
                        <a href="#hanging-icons" className="btn btn-secondary" style={{margin:'0px 4px'}}>Know More</a>
                        <a href="https://manojkumar.herokuapp.com" target="_blank" rel="noreferrer"  className="btn btn-info" style={{margin:'0px 4px'}}>Contact Developer</a>
                    </div>
                </div>

                <div className="px-4 py-5 bg-secondary why" id="hanging-icons">
                    <h2 className="pb-2 border-bottom">Why on Document-Keeper-web-app?</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="col d-flex align-items-start">
                            <div>
                                <h2>Easy Navigation</h2>
                                <p>We have always been taught that navigation is the result of civilization, but modern archeology has demonstrated very clearly that this is not so. Ease of navigation is important in both physical and virtual space.</p>
                            </div>
                        </div>
                        <div className="col d-flex align-items-start">
                            <div>
                                <h2>Secure</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt deserunt magnam, amet eos ea beatae delectus inventore rem tempore enim atque. Cum molestiae consectetur numquam, eveniet provident non. Sunt, delectus?</p>
                            </div>
                        </div>
                        <div className="col d-flex align-items-start">
                            <div>
                                <h2>Trust Worthy</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum amet sequi nihil itaque praesentium quos voluptatem nemo, doloribus dicta nam vero saepe molestiae, porro culpa provident voluptate? Rem saepe incidunt nobis? Laudantium, quod consequuntur?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;
