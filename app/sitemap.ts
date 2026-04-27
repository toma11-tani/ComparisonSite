import type { MetadataRoute } from 'next';
import { offices } from '../data/offices';

const BASE_URL = 'https://www.ribasarukagoshima-navi.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];

    const officeRoutes: MetadataRoute.Sitemap = offices.map((office) => ({
        url: `${BASE_URL}/offices/${office.id}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...officeRoutes];
}
