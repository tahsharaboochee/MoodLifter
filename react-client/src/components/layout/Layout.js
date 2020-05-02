import React, { Component } from 'react';
import './Layout.css';

class Layout extends Component {
    render() {
        return (
            <main class="site-layout__main">
                <div class="hero">
                    <div class="hero__inner">
                        <h2 class="heading   heading--xlarge hero__heading">
                            <span class="heading__main">
                                Music
                                <br />
                                Streaming
                                <br />
                                Redefined
                            </span>
                        </h2>
                        <div class="download-buttons"></div>
                        <div class="hero__wave" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409 14" class="wave  wave--animated  ">
                                <g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="round">
                                    <path
                                        class="wave__thin"
                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                    ></path>
                                    <path
                                        class="wave__thick"
                                        stroke-width="5"
                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="container container--white">
                    <div class="rich-text  rich-text--large rich-text--left-aligned">
                        <p className="f3 white">
                            Every one Experiences Feelings of Happiness, Sadness and Anger
                            I believe that listening to music is an excellent way for us to cycle through our emotions, which is why
                            I built the interactive playlist — I call them moodLifters.
                        </p>
                        <p className="f3 white" >Get ready to take music discovery to a whole new level.</p>
                    </div>
                    <div class="rich-text__wave rich-text__wave--desktop" aria-hidden="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 409 14"
                            class="wave delay-4 wave--animated wave--inherit-bg "
                        >
                            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round">
                                <path
                                    class="wave__thin"
                                    d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                ></path>
                                <path
                                    class="wave__thick"
                                    stroke-width="5"
                                    d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                ></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div>
                    <div class="teaser">
                        <div class="container">
                            <div class="grid-container grid-container--vertical-gaps grid-container--vertical-center  ">
                                <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="grid-container    ">
                                        <div class="grid-item grid-item--12">
                                            <h2 class="heading heading--dark   teaser__title">
                                                <span class="heading__pre-text">MoodLifter is</span><br/>
                                                <span  class="heading__main">Personal</span>
                                            </h2>
                                        </div>
                                        <div class="teaser__wave teaser__wave--mobile" aria-hidden="true">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 409 14"
                                                class="wave delay-5 wave--animated wave--inherit-bg "
                                            >
                                                <g
                                                    fill="none"
                                                    fill-rule="evenodd"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                >
                                                    <path
                                                        class="wave__thin"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                    <path
                                                        class="wave__thick"
                                                        stroke-width="5"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="grid-item grid-item--12 grid-item-lg--10">
                                            <p class="teaser__manchet" className="f3 white">
                                                Click your mood, sit back as moodlifter builds
                                                you an interactive playlist based on your favorite music.
                                            </p>
                                            <div class="teaser__wave teaser__wave--desktop" aria-hidden="true">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 409 14"
                                                    class="wave delay-7 wave--animated wave--inherit-bg "
                                                >
                                                    <g
                                                        fill="none"
                                                        fill-rule="evenodd"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                    >
                                                        <path
                                                            class="wave__thin"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                        <path
                                                            class="wave__thick"
                                                            stroke-width="5"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div class="teaser__content">
                                                <div class="rich-text rich-text--no-padding  ">
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="teaser__image-wrapper">
                                        <img
                                            srcSet="https://images.prismic.io/MoodLifter-com/1f31e4f94588e688adbab2a811acb3eb5713b200_teaser_MoodLifters-2.png?auto=compress,format&amp;fit=clamp&amp;w=580, https://images.prismic.io/MoodLifter-com/1f31e4f94588e688adbab2a811acb3eb5713b200_teaser_MoodLifters-2.png?auto=compress,format&amp;fit=clamp&amp;w=1160 2x, https://images.prismic.io/MoodLifter-com/1f31e4f94588e688adbab2a811acb3eb5713b200_teaser_MoodLifters-2.png?auto=compress,format&amp;fit=clamp&amp;w=1740 3x"
                                            src="https://images.prismic.io/MoodLifter-com/1f31e4f94588e688adbab2a811acb3eb5713b200_teaser_MoodLifters-2.png?auto=compress,format&amp;fit=clamp&amp;w=1160"
                                            alt=""
                                            class="teaser__image"
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <div class="teaser">
                        <div class="container">
                            <div class="grid-container grid-container--vertical-gaps grid-container--vertical-center grid-container--reverse ">
                                <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="grid-container    ">
                                        <div class="grid-item grid-item--12">
                                            <h2 class="heading heading--dark   teaser__title">
                                                <span class="heading__pre-text">MoodLifter is</span><br/>
                                                <span class="heading__main">Interactive</span>
                                            </h2>
                                        </div>
                                        <div class="teaser__wave teaser__wave--mobile" aria-hidden="true">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 409 14"
                                                class="wave delay-3 wave--animated wave--inherit-bg "
                                            >
                                                <g
                                                    fill="none"
                                                    fill-rule="evenodd"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                >
                                                    <path
                                                        class="wave__thin"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                    <path
                                                        class="wave__thick"
                                                        stroke-width="5"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="grid-item grid-item--12 grid-item-lg--10">
                                            <p class="teaser__manchet">
                                                Add songs to your moodLifter with tracks, and watch as the
                                                playlist adapts. You’re in control.
                                            </p>
                                            <div class="teaser__wave teaser__wave--desktop" aria-hidden="true">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 409 14"
                                                    class="wave delay-4 wave--animated wave--inherit-bg "
                                                >
                                                    <g
                                                        fill="none"
                                                        fill-rule="evenodd"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                    >
                                                        <path
                                                            class="wave__thin"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                        <path
                                                            class="wave__thick"
                                                            stroke-width="5"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div class="teaser__content">
                                                <div class="rich-text rich-text--no-padding  ">
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                 <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="teaser__image-wrapper">
                                        <img
                                            srcSet="https://images.prismic.io/MoodLifter-com/853f877a60db8f487569f2f33606679052cc6618_teaser_interactive.png?auto=compress,format&amp;fit=clamp&amp;w=580, https://images.prismic.io/MoodLifter-com/853f877a60db8f487569f2f33606679052cc6618_teaser_interactive.png?auto=compress,format&amp;fit=clamp&amp;w=1160 2x, https://images.prismic.io/MoodLifter-com/853f877a60db8f487569f2f33606679052cc6618_teaser_interactive.png?auto=compress,format&amp;fit=clamp&amp;w=1740 3x"
                                            src="https://images.prismic.io/MoodLifter-com/853f877a60db8f487569f2f33606679052cc6618_teaser_interactive.png?auto=compress,format&amp;fit=clamp&amp;w=1160"
                                            alt=""
                                            class="teaser__image"
                                        />
                                    </div>
                                </div> 
                             </div>
                        </div>
                    </div> */}
                    {/* <div class="teaser">
                        <div class="container">
                            <div class="grid-container grid-container--vertical-gaps grid-container--vertical-center  ">
                                <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="grid-container    ">
                                        <div class="grid-item grid-item--12">
                                            <h2 class="heading heading--dark   teaser__title">
                                                <span class="heading__pre-text">MoodLifter is</span><br/>
                                                <span class="heading__main">Social</span>
                                            </h2>
                                        </div>
                                        <div class="teaser__wave teaser__wave--mobile" aria-hidden="true">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 409 14"
                                                class="wave delay-6 wave--animated wave--inherit-bg "
                                            >
                                                <g
                                                    fill="none"
                                                    fill-rule="evenodd"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                >
                                                    <path
                                                        class="wave__thin"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                    <path
                                                        class="wave__thick"
                                                        stroke-width="5"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="grid-item grid-item--12 grid-item-lg--10">
                                            <p class="teaser__manchet">
                                                Good enough to share? Send your new moodlifter to a friend and let them
                                                adjust it to make it their own.
                                            </p>
                                            <div class="teaser__wave teaser__wave--desktop" aria-hidden="true">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 409 14"
                                                    class="wave delay-6 wave--animated wave--inherit-bg "
                                                >
                                                    <g
                                                        fill="none"
                                                        fill-rule="evenodd"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                    >
                                                        <path
                                                            class="wave__thin"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                        <path
                                                            class="wave__thick"
                                                            stroke-width="5"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                 <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="teaser__image-wrapper">
                                        <img
                                            srcSet="https://images.prismic.io/MoodLifter-com/4f1df17020b20d54d0f0a9f41170ec9735fa73c3_teaser_social2x.png?auto=compress,format&amp;fit=clamp&amp;w=580, https://images.prismic.io/MoodLifter-com/4f1df17020b20d54d0f0a9f41170ec9735fa73c3_teaser_social2x.png?auto=compress,format&amp;fit=clamp&amp;w=1160 2x, https://images.prismic.io/MoodLifter-com/4f1df17020b20d54d0f0a9f41170ec9735fa73c3_teaser_social2x.png?auto=compress,format&amp;fit=clamp&amp;w=1740 3x"
                                            src="https://images.prismic.io/MoodLifter-com/4f1df17020b20d54d0f0a9f41170ec9735fa73c3_teaser_social2x.png?auto=compress,format&amp;fit=clamp&amp;w=1160"
                                            alt=""
                                            class="teaser__image"
                                        />
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div> */}
                    {/* <div class="teaser">
                        <div class="container">
                            <div class="grid-container grid-container--vertical-gaps grid-container--vertical-center grid-container--reverse ">
                                <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="grid-container    "> 
                                         <div class="grid-item grid-item--12">
                                            <h2 class="heading heading--dark   teaser__title">
                                                <span class="heading__pre-text">MoodLifter is music</span><br/>
                                                <span class="heading__main">Music is Ours</span>
                                            </h2>
                                        </div>
                                        <div class="teaser__wave teaser__wave--mobile" aria-hidden="true">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 409 14"
                                                class="wave delay-1 wave--animated wave--inherit-bg "
                                            >
                                                <g
                                                    fill="none"
                                                    fill-rule="evenodd"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                >
                                                    <path
                                                        class="wave__thin"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                    <path
                                                        class="wave__thick"
                                                        stroke-width="5"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </div> 
                                         <div class="grid-item grid-item--12 grid-item-lg--10">
                                            <div class="teaser__wave teaser__wave--desktop" aria-hidden="true">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 409 14"
                                                    class="wave delay-1 wave--animated wave--inherit-bg "
                                                >
                                                    <g
                                                        fill="none"
                                                        fill-rule="evenodd"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                    >
                                                        <path
                                                            class="wave__thin"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                        <path
                                                            class="wave__thick"
                                                            stroke-width="5"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div> 
                                     </div>
                                </div>
                                <div class="grid-item grid-item--12 grid-item-md--6"></div>
                            </div> 
                        </div>
                    </div> */}
                </div>
                {/* <div class="container">
                    <div class="divider"></div>
                </div> */}
                {/*  <div>
                    <div class="teaser">
                        <div class="container">
                            <div class="grid-container grid-container--vertical-gaps grid-container--vertical-center  ">
                               <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="grid-container    ">
                                        <div class="grid-item grid-item--12">
                                            <h2 class="heading heading--dark   teaser__title">
                                                <span class="heading__pre-text">MoodLifter is</span><br/>
                                                <span class="heading__main">made for music lovers like you</span>
                                            </h2>
                                        </div>
                                        <div class="teaser__wave teaser__wave--mobile" aria-hidden="true">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 409 14"
                                                class="wave delay-1 wave--animated wave--inherit-bg "
                                            >
                                                <g
                                                    fill="none"
                                                    fill-rule="evenodd"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                >
                                                    <path
                                                        class="wave__thin"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                    <path
                                                        class="wave__thick"
                                                        stroke-width="5"
                                                        d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </div> 
                                        {/* <div class="grid-item grid-item--12 grid-item-lg--10">
                                            <p class="teaser__manchet">
                                                MoodLifter is built by and for music enthusiasts. I celebrate music as
                                                vital to our culture, its impact on our lives and the sense of community
                                                it fosters. MoodLifter is redefining what it means to discover, listen to
                                                and share music.
                                            </p>
                                            <div class="teaser__wave teaser__wave--desktop" aria-hidden="true">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 409 14"
                                                    class="wave delay-8 wave--animated wave--inherit-bg "
                                                >
                                                    <g
                                                        fill="none"
                                                        fill-rule="evenodd"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                    >
                                                        <path
                                                            class="wave__thin"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                        <path
                                                            class="wave__thick"
                                                            stroke-width="5"
                                                            d="M3 3c6.4979 0 6.4979 8 12.9965 8 6.4995 0 6.4995-8 12.9999-8 6.4978 0 6.4978 8 12.9965 8 6.4995 0 6.4995-8 12.9998-8 6.4987 0 6.4987 8 12.9974 8 6.4995 0 6.4995-8 12.9982-8 6.4995 0 6.4995 8 12.999 8 6.4986 0 6.4986-8 12.9981-8 6.4995 0 6.4995 8 12.9982 8 6.5012 0 6.5012-8 13.0007-8s6.4995 8 12.9998 8c6.4987 0 6.4987-8 12.9982-8s6.4995 8 12.999 8 6.4995-8 12.9998-8c6.4995 0 6.4995 8 12.999 8 6.5011 0 6.5011-8 13.0014-8 6.4987 0 6.4987 8 12.9982 8s6.4995-8 12.999-8 6.4995 8 12.9982 8c6.4995 0 6.4995-8 12.9982-8 6.5003 0 6.5003 8 12.9998 8 6.5011 0 6.5011-8 13.0014-8 6.4995 0 6.4995 8 12.9998 8 6.5004 0 6.5004-8 13.0007-8 6.5011 0 6.5011 8 13.0014 8 6.5012 0 6.5012-8 13.0023-8 6.4995 0 6.4995 8 12.999 8 6.502 0 6.502-8 13.0039-8 6.5028 0 6.5028 8 13.0047 8 6.5028 0 6.5028-8 13.0055-8 6.5028 0 6.5028 8 13.0064 8"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div class="teaser__content">
                                                <div class="rich-text rich-text--no-padding  ">
                                                    <p></p>
                                                </div>
                                            </div>
                                            <a href="/about/" class="teaser__button button button--dark ">
                                                <span class="button__text">Read more</span> 
                                            </a> 
                                        </div> 
                                    </div>
                                </div>
                                <div class="grid-item grid-item--12 grid-item-md--6">
                                    <div class="teaser__image-wrapper">
                                        <img
                                            srcSet="https://images.prismic.io/MoodLifter-com/4a684f794a169b633b8a34f15e915777253f0a5f_image_about.jpg?auto=compress,format&amp;fit=clamp&amp;w=580, https://images.prismic.io/MoodLifter-com/4a684f794a169b633b8a34f15e915777253f0a5f_image_about.jpg?auto=compress,format&amp;fit=clamp&amp;w=1160 2x, https://images.prismic.io/MoodLifter-com/4a684f794a169b633b8a34f15e915777253f0a5f_image_about.jpg?auto=compress,format&amp;fit=clamp&amp;w=1740 3x"
                                            src="https://images.prismic.io/MoodLifter-com/4a684f794a169b633b8a34f15e915777253f0a5f_image_about.jpg?auto=compress,format&amp;fit=clamp&amp;w=1160"
                                            alt=""
                                            class="teaser__image"
                                        />
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>*/}
            </main>
        );
    }
}

export default Layout;
