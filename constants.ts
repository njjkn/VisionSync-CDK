export const ACCOUNTS = {
    VISION_SYNC_ROOT: '061051239164',
    VISION_SYNC_DEV: '626635410100',
    VISION_SYNC_GAMMA: '867344432065',
};

export const US_WEST_2 = 'us-west-2';


export interface StageConfig {
    name: string;
    isProd: boolean;
    environments: {
        name: string;
        accountId: string;
        regions: string[];
        isServiceStack?: boolean;
    }[];
}

export const STAGES: StageConfig[] = [
    {
        name: 'Root',
        isProd: false,
        environments: [
            {
                name: 'VisionSync',
                accountId: ACCOUNTS.VISION_SYNC_ROOT,
                regions: [US_WEST_2],
            },
        ],
    },
    {
        name: 'Dev',
        isProd: false,
        environments: [
            {
                name: 'VisionSync',
                accountId: ACCOUNTS.VISION_SYNC_DEV,
                regions: [US_WEST_2],
            },
        ],
    },
    {
        name: 'Gamma',
        isProd: false,
        environments: [
            {
                name: 'VisionSync',
                accountId: ACCOUNTS.VISION_SYNC_GAMMA,
                regions: [US_WEST_2],
            },
        ],
    },
    // Example of future prod stage
    /*
    {
      name: 'Prod',
      isProd: true,
      environments: [
        { name: 'VisionSync', accountId: 'YOUR_PROD_ACCOUNT_ID', regions: [US_WEST_2] }
      ],
    },
    */
];