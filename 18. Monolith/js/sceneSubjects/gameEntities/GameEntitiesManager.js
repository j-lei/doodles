function GameEntitiesManager(scene, gameConstants, gameState) {
    const playerShooter = new PlayerBulletsShooter(scene, gameConstants)

    const player = new Player( scene, gameState, playerShooter )
    const monolith = new Monolith(scene, gameConstants)

    const enemiesSpawner = new EnemiesSpawner(scene, gameConstants)

    const turrets = new Turrets(scene, gameConstants, gameState)

    this.player = player

    this.update = function(time) {
        player.update(time)
        monolith.update(time)  
        turrets.update(time)

        enemiesSpawner.update(time)
        playerShooter.update(time)

        const bullets = playerShooter.bullets
        const enemies = enemiesSpawner.enemies

        const enemyBullets = turrets.getBullets();
        
        checkCollision(bullets, enemies, player)
        checkCollisionWithPlayer(enemyBullets, player)
    }   

    function checkCollision(array1, array2) {
        for(let i=0; i<array1.length; i++) {
            const el1 = array1[i]
            for(let j=0; j<array2.length; j++) {
                const el2 = array2[j]

                const distance = el1.position.distanceTo( el2.position );
                if(distance < el2.boundingSphereRad) {
                    el1.collision = true
                    el2.collision = true

                    eventBus.post(increaseScore)
                }
            }
        }
    }

    function checkCollisionWithPlayer(array1, player) {
        for(let i=0; i<array1.length; i++) {
            const el1 = array1[i]

            const distance = el1.position.distanceTo( player.position );
            if(distance < el1.boundingSphereRad) {
                el1.collision = true
                
                player.takeDamage()
            }
        }
    }
}