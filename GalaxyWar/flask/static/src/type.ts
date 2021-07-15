export const SPACESHIP: SpaceshipType = {
    black: {
        1: {
            y: 1.45,
            width: 179,
            height: 400,
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
            
        }
    },
    blue: {
        1: {

        },
        2: {

        },
        3: {
            
        },
        4: {
            
        },
        5: {
            
        },
        6: {
            
        },
        7: {
            
        },
        8: {
            
        },
        9: {
            y: 1.65,
            width: 293,
            height: 400,
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
        }
    },
    green: {
        1: {

        },
        2: {
            y: 1.7,
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
                    // -67.14, 67.14,
                    // -48.57, 48.57,
                    // -28.57, 28.57
                ],
                y: [
                    97.57
                    // 95.5, 95.5,
                    // 95.5, 95.5,
                    // 95.5, 95.5
                ]
            }
        },
        3: {
            
        },
        4: {
            
        },
        5: {
            
        }
    },
    orange: {

    },
    prime: {
        1: {
            y: 1.38,
            width: 403,
            height: 286,
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
    },
    red: {

    }
};

export interface SpaceshipType {
    black?: SpaceshipConfig;
    blue?: SpaceshipConfig;
    green?: SpaceshipConfig;
    orange?: SpaceshipConfig;
    prime?: SpaceshipConfig;
    red?: SpaceshipConfig;
}
export interface SpaceshipConfig {
    [key: number]: SpaceshipData
}
export interface SpaceshipData {
    y?: number;
    width?: number;
    height?: number;
    bullet?: { x: number[], y: number[] };
    flame?: { x: number[], y: number[] };
}