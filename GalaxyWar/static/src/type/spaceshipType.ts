export const Spaceships: SpaceshipConfig = {
    0: {
        // y: 1.38,
        bullet: {
            x: [
                -12.14, 12.14
            ],
            y: [
                -98.38, -98.38
            ]
        },
        flame: {
            x: [
                0
                // -67.14, 67.14, // -48.57, 48.57, // -28.57, 28.57
            ],
            y: [
                97.57
                // 95.5, 95.5, // 95.5, 95.5, // 95.5, 95.5
            ]
        }
    },
    1: {
        // y: 1.38,
        // width: 304,
        // height: 254,
        bullet: {
            x: [
                -85.53, 85.53, 
                -44.08, 44.08,
                -36.84, 36.84
            ],
            y: [
                -8.66, -8.66,
                -81.89, -81.89,
                -81.89, -81.89
            ]
        },
        flame: {
            x: [
                -85.53, 85.53
            ],
            y: [
                100, 100
            ]
        }

    },
    2: {
        // y: 1.38,
        // width: 464,
        // height: 960,
        bullet: {
            x: [
                -85.56, 85.56
            ],
            y: [
                32.92, 32.92
            ]
        },
        flame: {
            x: [
                0
            ],
            y: [
                85.63
            ]
        }
    },
    3: {
        // y: 1.38,
        // width: 179,
        // height: 400,
        bullet: {
            x: [
                -26.26, 26.26
            ],
            y: [
                -94.33, -94.33
            ]
        },
        flame: {
            x: [
                0
            ],
            y: [
                20.7
            ]
        }
    },
    4: {
        // y: 1.38,
        // width: 179,
        // height: 400,
        bullet: {
            x: [
                -54.58, 54.58
            ],
            y: [
                7.71, 7.71
            ]
        },
        flame: {
            x: [
                -8.75, 8.75
            ],
            y: [
                98.32, 98.32
            ]
        }
    },
    5: {
        // y: 1.38,
        // width: 293,
        // height: 400,
        bullet: {
            x: [
                -15.77, 15.77
            ],
            y: [
                -90.4, -90.4
            ]
        },
        flame: {
            x: [
                -71.52, 71.52
            ],
            y: [
                85.5, 85.5
            ]
        }
    },
    6: {
        // y: 1.38,
        // width: 403,
        // height: 286,
        flame:{
            x: [
                -87.1, 87.1
            ],
            y: [
                55.24, 55.24
            ]
        },
        bullet: {
            x: [
                -87.1, 87.1,
                -47.64, 47.64,
                -17.37, 17.37
            ],
            y: [
                -57.34, -57.34,
                -71.33, -71.33,
                -86.01, -86.01
            ]
        }
    }
};

export interface SpaceshipConfig {
    [key: number]: SpaceshipData
}
export interface SpaceshipData {
    // y?: number;
    // width?: number;
    // height?: number;
    bullet?: { x: number[], y: number[] };
    flame?: { x: number[], y: number[] };
}