/**
 * https://i.ibb.co/MN0R4L3/bmw.png
https://i.ibb.co/BL4Cp2t/download.jpg
https://i.ibb.co/drjgG9S/download.png
https://i.ibb.co/TbvyhmC/ford.jpg
https://i.ibb.co/72KGptF/Mercedes-Benz.jpg
https://i.ibb.co/MZt6k1d/toyota.jpg
 */

import Swal from "sweetalert2";

const AddBrandInfo = () => {
  const handleBrandInfo = (e) => {
    e.preventDefault();
    const form = e.target;
    const brandName = form.brandName.value;
    const brandImg = form.brandImg.value;
    const brandSliderImg1 = form.brandSliderImg1.value;
    const brandSliderImg2 = form.brandSliderImg2.value;
    const brandSliderImg3 = form.brandSliderImg3.value;

    const brandInfo = { brandName, brandImg, brandSliderImg1, brandSliderImg2, brandSliderImg3 };

    //send data to the server
    fetch("https://brand-shop-server-inky.vercel.app/brands", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(brandInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Successfuly Inserted",
            icon: "success",
            confirmButtonText: "Okay",
          });
          form.reset();
        }
      });

    console.log(brandInfo);
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-3xl text-center mt-10 font-semibold">Add Brand Info</h1>
            <form onSubmit={handleBrandInfo} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand Name</span>
                </label>
                <input name="brandName" type="text" placeholder="Brand Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand Image Url</span>
                </label>
                <input name="brandImg" type="text" placeholder="Brand Image Url" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand Slider Image1 Url</span>
                </label>
                <input name="brandSliderImg1" type="text" placeholder="Brand Slider Image1 Url" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand Slider Image2 Url</span>
                </label>
                <input name="brandSliderImg2" type="text" placeholder="Brand Slider Image2 Url" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand Slider Image3 Url</span>
                </label>
                <input name="brandSliderImg3" type="text" placeholder="Brand Slider Image3 Url" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Add Brand</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrandInfo;
