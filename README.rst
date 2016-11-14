gaia-data-workshop
==================

**Tutorial for the Gaia Data Workshop, Heidelberg, November 21-24**

**Requirements:**

- python 2 with virtualenv package
- git
- some python and MySQL knowledge

**Steps to take to get things going:**

1. Create an account on `gaia.aip.de <https://gaia.aip.de/>`_ if you don't have one yet.

2. Install ``virtualenv`` package

.. code-block:: bash
    
    pip install virtualenv

3. Clone git repository

.. code-block:: bash

    git clone https://github.com/mtjvc/gaia-data-workshop.git

4. Create virtual environment (make sure python 2 is being used) inside
   the ..gaia-data-workshop directory.

.. code-block:: bash

    virtualenv venv

5. Activate virtual environment 

.. code-block:: bash

    source venv/bin/activate

6. Install required packages

.. code-block:: bash

    pip install -r requirements.txt

7. Start the notebook server and open the notebook

.. code-block:: bash

    jupyter notebook

**Acknowledgements**

Galaxy image credit: R. Hurt (SSC), JPL-Caltech, NASA




