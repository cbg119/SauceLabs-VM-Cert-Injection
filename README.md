# SauceLabs-VM-Cert-Injection
How to use pre-runs on Sauce Labs to install custom root SSL certificates.


#How, what, and why?

One of the root certificates used by LetsEncrypt has recently expired (https://letsencrypt.org/docs/dst-root-ca-x3-expiration-september-2021/). 
LetsEncrypt is widely used by sites on the internet to generate their SSL certificate to allow HTTPS connections.

Most modern devices, operating systems, and softwares will have already had this new root certificate (ISRG) bundled in, or have recceived updates to have the cert installed. Due to a Sauce Labs bug, it seems that Sauce Labs Windows VMs that run *with Sauce Connect* do not have this updated root certificate. Windows VMs that *do not* run with Sauce Connect seem to have this cert installed.

Due to this, Windows VMs/tests ran with Sauce Connect may run into SSL issues when visiting sites with a LetsEncrypt certificate. This repo has been created to provide a temporary workaround for this issue.

The test spec itself and the config file are largely irrelevant (aside from needing to specify the prerun, and setting the tunnelIdentifier), as the main point of interest is in the .bat file.

This works by:
1. Echoing the .pem plaintext of the new root certificate (https://letsencrypt.org/certs/isrgrootx1.pem) into a new .pem file onto the VM's Desktop
2. Since we can't install the .pem file directly, we convert it to .der by using certutil, and in-built application in Windows
3. We then use certutil again to add this .der certificate to the Windows Root Trust Store
4. Profit!
