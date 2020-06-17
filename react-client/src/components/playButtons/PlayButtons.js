import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardFooter } from 'reactstrap';
import { prevTrack } from '../../helpers/api-fetcher';

const PlayButtons = (props) => {
    const { playing, token } = props.state;

    return (
        <div>
            <div className="pa3">
                <button
                    onClick={() => props.onPrevClick()}
                    className=" no-underline f4 b bw2 ph3 pv2 mb2 dib white bg-transparent bg-animate hover-bg-black hover-white"
                >
                    <Card>
                        <CardBody>
                            <CardImg
                                className="br-100 h4 w4 dib ba b--black-05 pa2"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_UgvxGKOBw_S_wHJ-AmlCHM6MYgpKyvrYRbjvwSH2ygrbsg7J&usqp=CAU"
                                alt="previous button"
                            />
                        </CardBody>
                        <CardFooter>Previous</CardFooter>
                    </Card>
                </button>
                <button
                    onClick={() => props.onPlayClick()}
                    className=" no-underline f4 b bw2 ph3 pv2 mb2 dib white bg-transparent bg-animate hover-bg-black hover-white"
                >
                    {playing ? (
                        <Card>
                            <CardBody>
                                <CardImg
                                    className="br-100 h4 w4 dib ba b--black-05 pa2"
                                    src="data:image/png;base64,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"
                                    alt="pause button"
                                />
                            </CardBody>
                            <CardFooter>Pause</CardFooter>
                        </Card>
                    ) : (
                        <Card>
                            <CardBody>
                                <CardImg
                                    className="br-100 h4 w4 dib ba b--black-05 pa2"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0N7ohjKiD2k1N1EkurkwuZH4JIFDbGyqKvUchsBFFUPZWpYgR&usqp=CAU"
                                    alt="play button"
                                />
                            </CardBody>
                            <CardFooter>Play</CardFooter>
                        </Card>
                    )}
                </button>
                <button
                    onClick={() => props.onNextClick()}
                    className=" no-underline f4 b bw2 ph3 pv2 mb2 dib white bg-transparent bg-animate hover-bg-black hover-white"
                >
                    <Card>
                        <CardBody>
                            <CardImg
                                style={{ backgroundColor: 'transparent' }}
                                className="br-100 h4 w4 dib ba b--black-05 pa2"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyP3h2jTjhMemhDLlX12aaFoJzlD-CT_7iV9BwqLnr7LYcSw_L&usqp=CAU"
                                alt="album cover"
                            />
                        </CardBody>
                        <CardFooter>Next</CardFooter>
                    </Card>
                </button>
            </div>
        </div>
    );
};

export default PlayButtons;
