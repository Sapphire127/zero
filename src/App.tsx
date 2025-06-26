import React, { useState, useEffect, useRef } from 'react'
import './App.scss'

// 游戏类型定义
interface Player {
    x: number
    y: number
    width: number
    height: number
    speed: number
}

type TileType = 0 | 1 // 0=空地, 1=墙壁
type GameMap = TileType[][]
type KeyCode = 'w' | 'a' | 's' | 'd' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

// 游戏常量
const TILE_SIZE = 20
const PLAYER_SIZE = 20
const PLAYER_SPEED = 3

// 地图数据
const MAP: GameMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function App() {
    const [player, setPlayer] = useState<Player>({
        x: 50,
        y: 50,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        speed: PLAYER_SPEED
    })

    const [keys, setKeys] = useState<Set<string>>(new Set())
    const animationRef = useRef<number>()

    // 检查碰撞
    const checkCollision = (x: number, y: number): boolean => {
        const mapX = Math.floor(x / TILE_SIZE)
        const mapY = Math.floor(y / TILE_SIZE)

        // 检查边界
        if (mapX < 0 || mapX >= MAP[0].length || mapY < 0 || mapY >= MAP.length) {
            return true
        }

        // 检查地图碰撞
        return MAP[mapY][mapX] === 1
    }

    // 更新玩家位置
    const updatePlayer = () => {
        setPlayer(prevPlayer => {
            let newX = prevPlayer.x
            let newY = prevPlayer.y

            // 处理输入
            if (keys.has('w') || keys.has('ArrowUp')) {
                newY -= prevPlayer.speed
            }
            if (keys.has('s') || keys.has('ArrowDown')) {
                newY += prevPlayer.speed
            }
            if (keys.has('a') || keys.has('ArrowLeft')) {
                newX -= prevPlayer.speed
            }
            if (keys.has('d') || keys.has('ArrowRight')) {
                newX += prevPlayer.speed
            }

            // 碰撞检测
            if (!checkCollision(newX, newY) &&
                !checkCollision(newX + prevPlayer.width, newY) &&
                !checkCollision(newX, newY + prevPlayer.height) &&
                !checkCollision(newX + prevPlayer.width, newY + prevPlayer.height)) {
                return { ...prevPlayer, x: newX, y: newY }
            }

            return prevPlayer
        })
    }

    // 游戏循环
    const gameLoop = () => {
        updatePlayer()
        animationRef.current = requestAnimationFrame(gameLoop)
    }

    // 键盘事件处理
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase()
            setKeys(prev => new Set(prev).add(key))
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase()
            setKeys(prev => {
                const newKeys = new Set(prev)
                newKeys.delete(key)
                return newKeys
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        // 启动游戏循环
        animationRef.current = requestAnimationFrame(gameLoop)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [keys])

    // 渲染地图
    const renderMap = () => {
        return MAP.map((row, y) =>
            row.map((tile, x) => (
                <div
                    key={`${x}-${y}`}
                    className={`tile ${tile === 1 ? 'wall' : 'empty'}`}
                    style={{
                        position: 'absolute',
                        left: x * TILE_SIZE,
                        top: y * TILE_SIZE,
                        width: TILE_SIZE,
                        height: TILE_SIZE
                    }}
                />
            ))
        )
    }

    return (
        <div className="App">
            <h1>React + TypeScript 移动方块</h1>
            <div className="game-container">
                <div
                    className="game-canvas"
                    style={{
                        position: 'relative',
                        width: MAP[0].length * TILE_SIZE,
                        height: MAP.length * TILE_SIZE,
                        backgroundColor: '#34495e',
                        border: '3px solid #3498db',
                        borderRadius: '5px'
                    }}
                >
                    {renderMap()}
                    <div
                        className="player"
                        style={{
                            position: 'absolute',
                            left: player.x,
                            top: player.y,
                            width: player.width,
                            height: player.height,
                            backgroundColor: '#e74c3c',
                            border: '2px solid #c0392b',
                            borderRadius: '2px'
                        }}
                    />
                </div>
                <div className="instructions">
                    <p>使用方向键或WASD键移动红色方块</p>
                </div>
            </div>
        </div>
    )
}

export default App;