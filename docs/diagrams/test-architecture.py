from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import Fargate, EC2, EKS
from diagrams.k8s.compute import Pod
from diagrams.aws.storage import S3, EBS
from diagrams.onprem.client import User, Users
from diagrams.onprem.container import Docker
from diagrams.aws.devtools import Codepipeline, Codecommit
from diagrams.programming.framework import Angular

graph_attr = {
    "layout": "dot",
    "compound": "true",
    "splines": "spline",
}

with Diagram("Automation Testing Architecture", show=False, graph_attr=graph_attr):

  dev = Users("Developers")
  sdet = User("SDET / QA Engineer")
  tl = User("Tech Lead")

  with Cluster("AWS") :

    code_commit = Codecommit("AWS CodeCommit")

    code_pipeline = Codepipeline("AWS CodePipeline")

    with Cluster("AWS EC2 Instance"):

      with Cluster("Application Container"):
        app = Angular("Web App")

      with Cluster("Test Report Container"):
        allure_server = Docker("Allure Test Report UI")

      with Cluster("Transient Container"):
        cypress_runner = Docker("Tests Execution")

    with Cluster("AWS EBS"):
      test_results = EBS("Test Results")

  cypress_runner >> app

  dev >> Edge(label="Commit app code") >> code_commit >> Edge(label="Trigger CI/CD pipeline") >> code_pipeline

  sdet >> Edge(label="Commit tests code") >> code_commit

  sdet >> Edge(label="Manually trigger tests", headport="s")>> code_pipeline

  code_pipeline >> Edge(label="Initialize test runner container", headport="w") >> cypress_runner >> Edge(label="Persist test results") >> test_results

  test_results >> Edge(label="Update tests report") >> allure_server

  allure_server << Edge(label="Validate test results", tailport="s") << sdet

  allure_server << Edge(label="Review tests report", tailport="e") << tl
