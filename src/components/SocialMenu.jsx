import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SocialMenu() {
    return (
        <Box
            sx={{
                // maxWidth: 'xl',
                display: 'flex',
                p: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="h6">
                Do not forget to subscribe to our social media network and
                follow the news!
            </Typography>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Link href="https://telegram.org/">
                    <Fab color="primary" aria-label="telegram">
                        <TelegramIcon />
                    </Fab>
                </Link>
                <Link href="https://www.youtube.com/">
                    <Fab color="primary" aria-label="youtube">
                        <YouTubeIcon />
                    </Fab>
                </Link>
                <Link href="https://www.linkedin.org/">
                    <Fab color="primary" aria-label="linkedin">
                        <LinkedInIcon />
                    </Fab>
                </Link>
                <Link href="https://www.github.com/">
                    <Fab color="primary" aria-label="github">
                        <GitHubIcon />
                    </Fab>
                </Link>
                <Link href="https://www.instagram.com/">
                    <Fab color="primary" aria-label="instagram">
                        <InstagramIcon />
                    </Fab>
                </Link>
                <Link href="https://www.facebook.com/">
                    <Fab color="primary" aria-label="facebook">
                        <FacebookIcon />
                    </Fab>
                </Link>
            </Box>
        </Box>
    );
}
