export const Bullets: BulletConfig = {
    0: {
        w: 88, h: 92
    },
    1: {
        w: 88, h: 96
    },
    2: {
        w: 88, h: 96
    },
    3: {
        w: 88, h: 140
    },
    4: {
        w: 88, h: 160
    },
    5: {
        w: 88, h: 186
    },
    6: {
        w: 88, h: 200
    },
    7: {
        w: 88, h: 220
    },
    8: {
        w: 88, h: 230
    },
    9: {
        w: 88, h: 236
    }
};

export interface BulletConfig {
    [key: number] : BulletData;
}
export interface BulletData {
    w: number;
    h: number;
}
