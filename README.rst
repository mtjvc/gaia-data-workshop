Gaia Data Workshop
==================

**Tutorial for the Gaia Data Workshop, Heidelberg, November 21-24**

**Requirements:**

- python 2 with virtualenv package
- git
- some python and MySQL knowledge

**Steps to take to get things going:**

1. Install ``virtualenv`` package

.. code-block:: bash
    
    pip install virtualenv

2. Clone git repository

.. code-block:: bash

    git clone https://github.com/mtjvc/gaia-data-workshop.git

3. Create virtual environment (make sure python 2 is being used) inside
   the ..gaia-data-workshop directory.

.. code-block:: bash

    virtualenv -p /usr/bin/python2.7 venv

4. Activate virtual environment 

.. code-block:: bash

    source venv/bin/activate

5. Install required packages

.. code-block:: bash

    pip install -r requirements.txt

6. Start the notebook server and open the notebook

.. code-block:: bash

    jupyter notebook

**Acknowledgements**

Galaxy image credit: R. Hurt (SSC), JPL-Caltech, NASA




