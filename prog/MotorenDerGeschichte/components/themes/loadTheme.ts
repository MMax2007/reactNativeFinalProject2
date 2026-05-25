import { getTheme } from '@/app/storage/colorTheme'
import { GameColors } from '@/constants/theme'
import { useState, useEffect } from 'react'

export default function useTheme() {
    const [theme, setTheme] = useState(GameColors.blue)
    
    useEffect(
        () => {
            async function loadSavedTheme() {
                const savedTheme = await getTheme()

                switch (savedTheme) {
                    case 'blue':
                        setTheme(GameColors.blue)
                        break
                    case 'white':
                        setTheme(GameColors.white)
                        break
                    case 'black':
                        setTheme(GameColors.black)
                        break
                    case 'green':
                        setTheme(GameColors.green)
                        break
                    case 'paleBlue':
                        setTheme(GameColors.paleBlue)
                        break
                    case 'ancient':
                        setTheme(GameColors.ancient)
                        break
                }
            }

            loadSavedTheme()
        }, []
    )
    return theme
}