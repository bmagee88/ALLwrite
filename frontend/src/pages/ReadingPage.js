import React, { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ReadingPage = () => {
  const { cover_title, first_page } = useParams();
  const [choices, setChoices] = useState([]);
  const [page, setPage] = useState({});
  const [isRatedByActiveUser, setIsRatedByActiveUser] = useState(false);

  const TEST_PAGE = {
    body: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum, lectus sit amet aliquam congue, augue elit tempor justo, vel venenatis nibh felis a felis. Maecenas tincidunt ullamcorper congue. Suspendisse rhoncus eros nec quam ullamcorper sagittis. Nullam imperdiet dolor ut metus viverra, nec luctus tortor posuere. Morbi commodo id lacus at lacinia. Curabitur vehicula nulla ac malesuada tristique. Maecenas placerat at mi nec pulvinar.
  
  Mauris vitae dignissim nibh. Proin varius lacus vel orci posuere congue. Aliquam felis mi, tempus non justo et, rhoncus mattis enim. Nulla facilisi. Fusce feugiat aliquam condimentum. Proin nec eros eget neque tristique posuere. Fusce convallis nec diam vel aliquam. Cras mattis id ex ac varius. Suspendisse augue arcu, rhoncus non diam non, rhoncus iaculis erat. Sed pulvinar accumsan pellentesque. Nunc pulvinar, mi a tempus scelerisque, nisl nisl tempor nisl, at auctor lorem turpis pellentesque ante. Vestibulum iaculis, elit pharetra blandit mattis, elit nisi convallis quam, dignissim imperdiet leo leo sollicitudin urna. Nullam a fringilla quam.
  
  Nunc lacinia hendrerit ligula, pellentesque tincidunt nibh malesuada a. Vestibulum luctus nec nisl ultrices vulputate. Sed eu malesuada dui. Cras finibus, mi gravida efficitur vulputate, nisl felis tincidunt elit, interdum tincidunt libero ante ac diam. Donec cursus elementum mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel laoreet tortor. Donec vitae volutpat quam, eu porta lectus. Nulla facilisi. Pellentesque a condimentum massa. Integer in vestibulum metus. Nulla maximus rhoncus nisi, a aliquet erat semper eget. Praesent volutpat, arcu a pharetra lobortis, tellus leo ullamcorper lacus, vel tincidunt massa erat nec mi.
  
  Pellentesque ut lorem et lorem rhoncus finibus vitae a nisl. Pellentesque sed accumsan justo, eget dictum est. Aliquam et nisi eget ipsum congue ullamcorper. Fusce vel interdum dolor, eu vehicula ligula. Suspendisse tristique nisl ut nulla vestibulum, a ullamcorper sem pharetra. Vestibulum facilisis, urna vitae cursus malesuada, risus ligula dignissim nunc, vitae ultricies tortor lectus sed lorem. Suspendisse vitae lorem sed metus dapibus venenatis. Donec varius mollis interdum. Etiam at leo sed magna convallis dapibus eget nec ex. Praesent at felis ultricies, semper magna non, condimentum tellus. Nulla facilisi. Etiam venenatis porta nunc id accumsan. Donec eu lorem at metus ultrices semper. Mauris mauris lorem, volutpat id fringilla a, congue non elit.
  
  Phasellus condimentum vel turpis id finibus. In lobortis cursus turpis. Donec ut leo et metus finibus tristique. Sed et libero leo. Nam sed sagittis lacus. Suspendisse nunc ex, pulvinar lobortis egestas vel, congue at mauris. Suspendisse placerat et dui vitae suscipit. Cras sed cursus arcu, nec auctor mi. Aenean bibendum ante erat, ac faucibus mauris ultricies non.
  
  Nulla elementum placerat mi quis gravida. Phasellus finibus nibh hendrerit mi accumsan convallis eu quis quam. Etiam sed dui lacinia, mattis nisi at, tempor nisi. Proin sem dolor, luctus sit amet tellus at, ornare tristique mi. Ut maximus, velit ac efficitur congue, purus nisl sagittis diam, in luctus tortor tortor eget velit. Etiam vehicula sed quam dapibus sodales. Mauris sed purus malesuada, sagittis tortor eget, pharetra tortor. Maecenas sed lectus lorem. Vivamus congue felis id rutrum sagittis. Aliquam. `,
    page_num: 1,
  };

  const FLAGS = { author: "Author", longest: "Longest", rating: "Rating" };

  const TEST_CHOICE_ONE = { prompt: "asdf", flags: [FLAGS.author] };
  const TEST_CHOICE_TWO = {};
  const TEST_CHOICE_THREE = {};
  const TEST_CHOICES = [TEST_CHOICE_ONE, TEST_CHOICE_TWO, TEST_CHOICE_THREE];

  useEffect(() => {
    //fetch first page
    //fetch choices
  }, []);

  //   useEffect(() => {
  //     setIsRatedByActiveUser((isRatedByActiveUser) => !isRatedByActiveUser);
  //   }, [isRatedByActiveUser]);

  return (
    <>
      <div className="container bg=light">
        <div className="row justify-content-between border border-dark mt-2">
          <div className="col-1 w-auto">back</div>
          <div className="col-1 w-auto">{cover_title}</div>
          <div className="col-1 w-auto">{TEST_PAGE.page_num}</div>
        </div>
        <div className="row mt-4 border border-dark p-3 justify-content-center">
          <div className="col-6 border">{TEST_PAGE.body}</div>
        </div>
        <div className="row justify-content-center border border-dark mt-2">
          <div className="col-1 w-auto">
            rated: {isRatedByActiveUser.toString()}
            <FormCheck
              onClick={() => {
                console.log("clicked");
                setIsRatedByActiveUser(() => !isRatedByActiveUser);
              }}
            ></FormCheck>
          </div>
        </div>
        {isRatedByActiveUser && (
          <div className="row justify-content-evenly mt-2 border border-dark p-3">
            <div className="col-12 col-md-5 col-lg-3 border border-dark mt-2">
              <div className="row">
                <div className="col">author</div>
                <div className="col">page rating</div>
                <div className="col">possible length</div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  {" "}
                  Nulla elementum placerat mi quis gravida. Phasellus finibus
                  nibh hendrerit mi accumsan convallis eu quis quam. Etiam sed
                  dui lacinia, mattis nisi at, tempor nisi. Proin sem dolor,
                  luctus sit amet tellus at, ornare tristique mi. Ut maximus,
                  velit ac efficitur congue, purus nisl sagittis diam, in luctus
                  tortor tortor eget velit. Etiam vehicula sed quam dapibus
                  sodales. Mauris sed purus malesuada, sagittis tortor eget,
                  pharetra tortor. Maecenas sed lectus lorem. Vivamus congue
                  felis id rutrum sagittis. Aliquam. `,
                </div>
              </div>
              <div className="row mt-2">
                <div className="col mb-2">flags</div>{" "}
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-3 border border-dark mt-2">
              <div className="row">
                <div className="col">author</div>
                <div className="col">page rating</div>
                <div className="col">possible length</div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  {" "}
                  Nulla elementum placerat mi quis gravida. Phasellus finibus
                  nibh hendrerit mi accumsan convallis eu quis quam. Etiam sed
                  dui lacinia, mattis nisi at, tempor nisi. Proin sem dolor,
                  luctus sit amet tellus at, ornare tristique mi. Ut maximus,
                  velit ac efficitur congue, purus nisl sagittis diam, in luctus
                  tortor tortor eget velit. Etiam vehicula sed quam dapibus
                  sodales. Mauris sed purus malesuada, sagittis tortor eget,
                  pharetra tortor. Maecenas sed lectus lorem. Vivamus congue
                  felis id rutrum sagittis. Aliquam. `,
                </div>
              </div>
              <div className="row mt-2">
                <div className="col mb-2">flags</div>
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-3 border border-dark mt-2">
              <div className="row">
                <div className="col">author</div>
                <div className="col">page rating</div>
                <div className="col">possible length</div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  {" "}
                  Nulla elementum placerat mi quis gravida. Phasellus finibus
                  nibh hendrerit mi accumsan convallis eu quis quam. Etiam sed
                  dui lacinia, mattis nisi at, tempor nisi. Proin sem dolor,
                  luctus sit amet tellus at, ornare tristique mi. Ut maximus,
                  velit ac efficitur congue, purus nisl sagittis diam, in luctus
                  tortor tortor eget velit. Etiam vehicula sed quam dapibus
                  sodales. Mauris sed purus malesuada, sagittis tortor eget,
                  pharetra tortor. Maecenas sed lectus lorem. Vivamus congue
                  felis id rutrum sagittis. Aliquam. `,
                </div>
              </div>
              <div className="row mt-2">
                <div className="col mb-2">flags</div>{" "}
              </div>
            </div>

            {/* {asdf.map(() => {
            return <ChoiceCard />;
          })} */}
          </div>
        )}
      </div>
    </>
  );
};

export default ReadingPage;
