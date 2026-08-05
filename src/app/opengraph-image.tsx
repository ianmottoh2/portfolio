import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { PERSONAL_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

export const alt = `${PERSONAL_INFO.preferredName} - ${PERSONAL_INFO.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const avatar = await readFile(
    join(process.cwd(), 'src/assets/images/profilePhoto.jpg'),
  );
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString('base64')}`;

  const topSkills = SKILL_CATEGORIES.flatMap((category) => category.skills)
    .filter((skill) => skill.highlight)
    .slice(0, 6)
    .map((skill) => skill.name);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 64,
          padding: 80,
          background: 'linear-gradient(135deg, #101013 0%, #1b1c20 55%, #16263a 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
            }}
          >
            {PERSONAL_INFO.preferredName}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 30,
              fontWeight: 600,
              color: '#9fd0ff',
            }}
          >
            {PERSONAL_INFO.title}
          </div>
          <div style={{ display: 'flex', marginTop: 40, fontSize: 22, color: '#9aa0ab' }}>
            {topSkills.join(' · ')}
          </div>
        </div>
        <img
          src={avatarSrc}
          width={200}
          height={200}
          style={{ borderRadius: 32, objectFit: 'cover', border: '4px solid rgba(255,255,255,0.25)' }}
        />
      </div>
    ),
    size,
  );
}
