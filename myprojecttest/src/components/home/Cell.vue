<template>
  <div id="cell">
    <img src="../../../static/img/home/back1.png" alt="" class="back" @click="back">
    <div class="top" style="background-image: url('../../../static/img/home/gan-cell.png')">
      <!--<img src="../../../static/img/home/gan-cell.png" width="100%" alt="">-->
      <p @click="ganCell(0)">万能的干细胞</p>
      <p @click="ganCell(1)">干细胞能做什么</p>
      <p @click="ganCell(2)">干细胞疗法在中国</p>
      <p @click="ganCell(3)">展望干细胞疗法</p>
    </div>
    <div class="bottom" style="background-image: url('../../../static/img/home/gan-cell2.png')">
      <!--万能的干细胞-->
      <div class="pro">
        <span>万能的干细胞</span>
      </div>
      <div class="title">
        <span>1</span> 什么是干细胞
      </div>
      <div class="content">
        我们的人体由许许多多的细胞构成，而干细胞是人体内具有自我复制和多向分化潜能的原始细胞。它在一定的条件下能够诱导分化成神经细胞、肝脏细胞、心肌细胞等构成人体的220多种功能细胞，是我们机体的起源细胞，是形成人体内各组织、器官的原始细胞。干细胞存在于早期胚胎、胎盘及其附属物、骨髓、外周血和成年人组织中。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell1.png" alt="">
      </div>
      <div class="title">
        <span>2</span> 干细胞的潜能
      </div>
      <div class="content">
        因此，研究干细胞技术，拓展干细胞疗法，成为人类再生医学的重要部分。可以利用诱导分化干细胞，在体外繁育出全新的、正常的甚至更年轻的细胞、组织或器官，并最终通过细胞组织或器官的移植实现对临床疾病的治疗。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell2.png" alt="">
      </div>
      <!--干细胞能做什么？-->
      <div class="pro">
        <span>干细胞能做什么？</span>
      </div>
      <div class="biaozhu">
        利用干细胞治疗疾病无疑是21世纪最热门的话题，目前越来越多的利用干细胞治愈疾病的案例让我们又一次看到了疾病治疗的另一片天地。美国FDA大力支持研究干细胞治疗。美国政府鼓励科研工作者致力于干细胞治疗领域的研究。中国CFDA也在积极准备支持干细胞治疗领域的研究。那么，干细胞到底应用到哪些医疗领域？
      </div>
      <div class="title">
        <span>1</span> 免疫调节功能
      </div>
      <div class="content">
        作为干细胞家族中的一员，间充质干细胞最重要的特性就在于其具有很强的免疫调节作用。有相关研究表明，进入人体的间充质干细胞可以显著缓解肝硬化病人的病情，明显减轻其肝脏部位的炎症反应。
      </div>
      <div class="img1">
        <img src="../../../static/img/home/cell3.png" alt="">
      </div>
      <div class="content">
        其实在人类的大部分严重疾病的发病过程中，例如肝硬化、糖尿病，甚至包括癌症，炎症都在其中扮演了至关重要的角色。而间充质干细胞就可以根据炎症的强弱大小，或者炎症发生的地点，来变换自己的性质，发挥自己不同的功能。当炎症反应加强时，其就会抑制免疫反应；当炎症反应减弱时，其能够促进免疫反应。
      </div>
      <div class="title">
        <span>2</span> 医疗美容整形
      </div>
      <div class="content">
        脂肪干细胞在美容整形外科应用的相关报道比较多，其临床效果也最为显著。在除皱、美白、丰胸、提臀等美容整形领域的应用已经很成熟了。与此同时，其在抗衰老方面的应用及研究也在展开。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell4.png" alt="">
      </div>
      <div class="title">
        <span>3</span> 逆转心脏衰老
      </div>
      <div class="content">
        随着年龄的增长，人类发生心血管疾病的可能性增加。而细胞衰老是心脏老化过程的主要原因，其特点是缩短了端粒，即染色体上的末端。端粒缩短与心脏功能障碍和肥大相关，心肌细胞增殖受损，间质纤维化，从而最终导致再生能力的下降。而将心脏干细胞回数人体可以帮助逆转天然的心脏衰老过程的相关研究已经在开展，相信未来有一天可以使用类似的治疗方法来预防人类与年龄相关的心脏功能衰退和心血管疾病。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell5.png" alt="">
      </div>
      <div class="title">
        <span>4</span> 缺血性疾病
      </div>
      <div class="content">
        研究表明，脂肪干细胞能够分泌一定量的细胞因子，如血管生长因子VEGF、PDGF、bFGF、血管生成素、GM-CSF、MCP-1和SDF-1α，而这些因子则有利于建立更好的损伤修复环境。其中血小板衍生内皮细胞生长因子，在体内与体外均被证实有促进血管新生的作用，这一特点使得脂肪干细胞在临床治疗上的应用前景得到了进一步的扩大。
      </div>
      <div class="img1">
        <img src="../../../static/img/home/cell6.png" alt="">
      </div>
      <div class="content">
        例如急性心肌梗死、缺血性心肌病、末梢血管疾病、急性肾小管坏死、糖尿病性视网膜病变、缺血性脑病、外伤性脊髓损伤以及移植中发生的局部缺血。
      </div>
      <div class="title">
        <span>5</span> 修复中枢神经系统损伤
      </div>
      <div class="content">
        神经干细胞来源的各类神经细胞的应用主要集中在修复损伤的中枢神经系统上。临床研究中，将永生化的人类胎儿神经元干细胞移植到11名中风病人体内，随后进行了12个月的跟踪观察，没有发现与细胞相关的以及与免疫相关的有害作用，这些永生化的神经干细胞不会强占脑组织，它们只是一群短暂存在的细胞群体，目前研究人员已经在这项研究中观察到一些病情改善，II期临床试验正在进行，旨在评估移植的神经元干细胞为中风病人带来的获益。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell7.png" alt="">
      </div>
      <div class="title">
        <span>6</span> 肿瘤
      </div>
      <div class="content">
        重组干扰素α（IFNα）作为临床药物可以治疗多种肿瘤，但是由于其半衰期短，用量高，副作用严重，在临床应用中受到限制。为解决这一瓶颈问题，科学家利用间充质干细胞的载体功能，使其携带表达IFNα，实现该细胞因子的局部释放和肿瘤的靶向治疗。实验发现，能够分泌IFNα的间充质干细胞的抗肿瘤能力要明显高于IFNα重组蛋白的作用。
      </div>
      <div class="img1">
        <img src="../../../static/img/home/cell8.png" alt="">
      </div>
      <div class="content">
        由此可见，干细胞在人体中扮演的角色是相当重要的。干细胞治疗疾病的基本原理就是：对组织细胞损伤的修复、替代损伤细胞的功能、激活机体自身细胞的再生功能。
      </div>
      <!--干细胞疗法在中国-->
      <div class="pro">
        <span>干细胞疗法在中国</span>
      </div>
      <div class="title">
        <span>1</span> 案例一
      </div>
      <div class="content">
        2016年，我国进行了全球首例胎盘间充质干细胞治疗早衰症。经过干细胞治疗，早衰症女孩的状态有了显著改善，急速衰老的身体得到了缓解，皮肤变得比以前光滑，听力和肝功能出现了改善的迹象。这则案例向人们展示了胎盘干细胞治疗早衰症十分具有潜力，目前又有2名患者希望得到干细胞治疗。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell9.png" alt="">
      </div>
      <div class="title">
        <span>2</span> 案例二
      </div>
      <div class="content">
        2017年，我国的医疗团队运用干细胞在创面治疗的科研成果及其临床应用研究，为一名因右下肢静脉溃疡9个多月的70岁患者实施了脐带间充质干细胞治疗，同时运用伤口湿性愈合理论指导下的伤口护理技术，经过该团队的密切合作，在应用干细胞治疗55天后，患者的伤口完全愈合。
      </div>
      <div class="title">
        <span>3</span> 案例三
      </div>
      <div class="content">
        2017年，坐轮椅14年的64岁脊髓损伤、下肢瘫痪患者经过间充质干细胞治疗2年后在中山大学附属第三医院奇迹般地从轮椅上站起来，并在支具辅助下缓慢迈开脚步，这意味着我国在干细胞治疗脊髓损伤领域获得了新突破。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell10.png" alt="">
      </div>
      <div class="title">
        <span>4</span> 案例四
      </div>
      <div class="content">
        2018年1月，南京鼓楼医院迎来了我国干细胞治疗卵巢早衰临床研究的首个健康宝宝，这也是全球首例干细胞复合胶原支架治疗卵巢早衰临床研究诞生的健康宝宝。时隔半个月，四川卫视紧接着报道了另一个成功案例。18名卵巢早衰患者参与了经四川省卫计委批准立项的“脐带间充质干细胞治疗卵巢早衰”临床试验，其中1名患者已于2017年7月诞下健康男婴。这给“不治之症”卵巢早衰女性患者实现生育梦带来了新希望。
      </div>
      <div class="img">
        <img src="../../../static/img/home/cell11.png" alt="">
      </div>
      <!--未来以来，展望干细胞疗法-->
      <div class="pro">
        <span>未来以来，展望干细胞疗法</span>
      </div>
      <div class="content1">
        随着干细胞理论的日臻完善和技术的迅猛发展，在疾病治疗和生物医药等领域必将产生划时代的成果。我们有理由相信，以干细胞为代表的再生医学为最终解决部分慢性病、老龄化与抗衰老，组织修复与再生，以及肿瘤预防治疗，带来了新的希望。
      </div>
    </div>
  </div>
</template>

<script>
  require('../../../static/css/index.css')

  export default {
    data() {
      return {
        height:'',
      }
    },
    created(){},
    mounted(){
      let _this=this;
      this.height=$(window).innerHeight()

    },
    methods:{
      ganCell(num){
          $("html, body").animate({
              // scrollTop: $(".pro:eq(" + num + ")")[0].offsetTop+this.height+30
              scrollTop: $(".pro:eq(" + num + ")")[0].offsetTop+$('#cell .top').height()+20
            },
            {duration: 500, easing: "swing"}
          );
      },
      back(){
        this.$router.go(-1)
      }
    },
  }
</script>

<style></style>
