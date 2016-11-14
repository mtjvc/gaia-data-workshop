var geometry;
var camera;
var particleSystem;
var clock = new THREE.Clock();
var camera_mode = 0;

d3.csv("res.csv", function(error, data) {
    data.forEach(function(d) {
        d.l = +d.l;
        d.b = +d.b;
        d.par = +d.par;
        d.rv = +d.rv;
        d.logg = +d.logg;
        d.rc = + d.rc;
        d.gc = + d.gc;
        d.bc = + d.bc;
    });
    particles = data.length;

    init(data);
    animate();
});

function init(data) {

    var positions;
    var values_color;
    var values_size;
    var color;

    data = data;

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 50000 );
    camera.position.z = 10000;

    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 8.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.addEventListener( 'change', render );

    var textureLoader = new THREE.TextureLoader();

    var attributes = {
        size:        { type: 'f', value: null },
        customColor: { type: 'c', value: null }
    };

    uniforms = {
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        texture:   { type: "t", value: textureLoader.load( "sprite.png" ) }
    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending:       THREE.NormalBlending,
        depthTest:      true,
        transparent:    true,
        alphaTest: 0.3,
    });

    scene = new THREE.Scene();

    geometry = new THREE.BufferGeometry({ attributes: attributes, });

    positions = new Float32Array( particles * 3 );
    values_color = new Float32Array( particles * 3 );
    values_size = new Float32Array( particles );
    color = new THREE.Color();

    for ( var i = 0; i < positions.length; i += 3 ) {

        var dist = 500.0 / (data[i/3].par + 0.001)
        var x = Math.cos(data[i/3].b / 180.0 * Math.PI) * Math.cos(data[i/3].l / 180.0 * Math.PI) * dist
        var y = Math.cos(data[i/3].b / 180.0 * Math.PI) * Math.sin(data[i/3].l / 180.0 * Math.PI) * dist
        var z = Math.sin(data[i/3].b / 180.0 * Math.PI) * dist

        positions[ i ]     = x - 800;
        positions[ i + 1 ] = y;
        positions[ i + 2 ] = z;

        color.setRGB( data[i/3].rc, data[i/3].gc, data[i/3].bc );
        // color.setRGB( 1.0, 1.0, 1.0);
        values_color[ i ]     = color.r;
        values_color[ i + 1 ] = color.g;
        values_color[ i + 2 ] = color.b;

        values_size[ i / 3] = 6.0 / (data[i/3].logg + 0.3);
    }

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'customColor', new THREE.BufferAttribute( values_color, 3 ) );
    geometry.addAttribute( 'size', new THREE.BufferAttribute( values_size, 1 ) );

    particleSystem = new THREE.Points( geometry, shaderMaterial );
    particleSystem.sortParticles = false;

    scene.add( particleSystem );

    
    texture = textureLoader.load('mw.jpg') 
    material = new THREE.MeshBasicMaterial({map: texture, alphaMap: texture})
    material.transparent = true;
    plane = new THREE.Mesh(new THREE.PlaneGeometry(1024 * 3, 1024 * 3), material);
    plane.material.side = THREE.DoubleSide;
    scene.add( plane )

    light = new THREE.AmbientLight(0x000000)
    scene.add( light )


    // var gridXZ = new THREE.GridHelper(1000, 50);
    // gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff)  );

    renderer = new THREE.WebGLRenderer( { clearColor: 0xffffff, clearAlpha: 1 } );
    renderer.setClearColor( 0xaaaaaa, 0 );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    window.addEventListener('resize', onWindowResize, false );
    window.addEventListener('keydown', onCpress, false);

}

function onCpress(event) {

    var keycode = event.keyCode;
    switch(keycode){
        case 67:

            var prevCamera = camera;

            camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 50000 );
            camera.position.copy( prevCamera.position  );
            camera.rotation.copy( prevCamera.rotation  );

            var MODE = { TRACKBALL: 0, FLY: 1  };

            switch( camera_mode ) {

                case MODE.FLY:

                controls = new THREE.TrackballControls( camera  );
                controls.rotateSpeed = 1.0;
                controls.zoomSpeed = 8.2;
                controls.panSpeed = 0.8;
                controls.noZoom = false;
                controls.noPan = false;
                controls.staticMoving = true;
                controls.dynamicDampingFactor = 0.3;
                controls.addEventListener( 'change', render );

                camera_mode = MODE.TRACKBALL;

                break;

                case MODE.TRACKBALL:

                controls = new THREE.FlyControls( camera  );
                controls.movementSpeed = 2000;
                controls.domElement = container;
                controls.rollSpeed = Math.PI / 8;
                controls.autoForward = false;
                controls.dragToLook = false;

                camera_mode = MODE.FLY;

                break;
            }
        break;

        case 86:
            if (camera_mode == 1){
                var prevCamera = camera;

                camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 50000 );
                camera.position.copy( prevCamera.position  );
                camera.rotation.copy( prevCamera.rotation  );

                camera_mode = 0;
            }
        break;
    }
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {

    requestAnimationFrame( animate );
    var delta = clock.getDelta();

    render();
    controls.update(delta)

}


function render() {

    renderer.render( scene, camera );

}
